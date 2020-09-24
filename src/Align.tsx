import { AlignResult, AlignType, TargetPoint, TargetType } from './interface';
import VueTypes from 'vue-types';
import { Ref } from 'vue';

import addEventListener from '@ayase/vc-util/lib/Dom/addEventListener';
import { isSamePoint, monitorResize, restoreFocus } from './util';
import { alignElement, alignPoint } from 'dom-align';
import { composeRef } from '@ayase/vc-util/lib/ref';
import { returnUndefined } from '@ayase/vc-util';
import useBuffer from './hooks/useBuffer';

import {
  defineComponent,
  onUnmounted,
  watchEffect,
  cloneVNode,
  isVNode,
  watch,
  toRef,
  ref
} from 'vue';

type OnAlign = (source: HTMLElement, result: AlignResult) => void;

export interface AlignProps {
  align: AlignType;
  target: TargetType;
  monitorBufferTime?: number;
  monitorWindowResize?: boolean;
  disabled?: boolean;
  // children: React.ReactElement;
}

export interface AlignRawBindings extends RefAlign {
  nodeRef: Ref<any>;
}

export interface AlignEmits {
  onAlign?: OnAlign;
}

interface MonitorRef {
  element?: HTMLElement;
  cancel: () => void;
}

export interface RefAlign {
  forceAlign: () => void;
}

function getElement(func: TargetType) {
  if (typeof func !== 'function') {
    return null;
  }

  return func();
}

function getPoint(point: TargetType) {
  if (typeof point !== 'object' || !point) {
    return null;
  }

  return point;
}

export default defineComponent<AlignProps, AlignRawBindings>({
  name: 'Align',

  props: {
    align: VueTypes.shape({
      points: VueTypes.arrayOf(VueTypes.string).def(undefined),
      offset: VueTypes.arrayOf(VueTypes.number).def(undefined),
      targetOffset: VueTypes.arrayOf(VueTypes.number).def(undefined),
      overflow: VueTypes.shape({
        adjustX: VueTypes.oneOfType([VueTypes.bool, VueTypes.number]),
        adjustY: VueTypes.oneOfType([VueTypes.bool, VueTypes.number])
      }).loose,

      useCssRight: VueTypes.bool.def(undefined),
      useCssBottom: VueTypes.bool.def(undefined),
      useCssTransform: VueTypes.bool.def(undefined)
    }).loose.def(returnUndefined),

    target: VueTypes.oneOfType([
      VueTypes.func,
      VueTypes.shape({
        clientX: VueTypes.number,
        clientY: VueTypes.number,
        pageX: VueTypes.number,
        pageY: VueTypes.number
      }).loose
    ]).def(returnUndefined),

    monitorBufferTime: VueTypes.number.def(0),
    monitorWindowResize: VueTypes.bool.def(undefined),
    disabled: VueTypes.bool.def(undefined)
  } as undefined,

  emits: ['align'],

  setup(props, ctx) {
    const onAlign = (source, result) => ctx.emit('align', source, result);

    const cacheRef = ref<{ element?: HTMLElement; point?: TargetPoint }>({});
    const nodeRef = ref();

    // ===================== Align ======================
    // We save the props here to avoid closure makes props ood
    const forceAlignPropsRef = ref<{
      disabled?: boolean;
      target?: TargetType;
      onAlign?: OnAlign;
    }>({});

    forceAlignPropsRef.value.disabled = props.disabled;
    forceAlignPropsRef.value.target = props.target;
    forceAlignPropsRef.value.onAlign = onAlign;

    const disabledRef = toRef(props, 'disabled');

    watch(
      [disabledRef, toRef(props, 'target')] as const,
      ([disabled, target]) => {
        forceAlignPropsRef.value.disabled = disabled;
        forceAlignPropsRef.value.target = target;
      }
    );

    const [forceAlign, cancelForceAlign] = useBuffer(() => {
      const {
        disabled: latestDisabled,
        target: latestTarget
      } = forceAlignPropsRef.value;

      if (!latestDisabled && latestTarget) {
        const source = nodeRef.value;
        const element = getElement(latestTarget);
        const point = getPoint(latestTarget);
        let result: AlignResult;

        cacheRef.value.element = element;
        cacheRef.value.point = point;

        // IE lose focus after element realign
        // We should record activeElement and restore later
        const { activeElement } = document;

        if (element) {
          result = alignElement(source, element, props.align);
        } else if (point) {
          result = alignPoint(source, point, props.align);
        }

        restoreFocus(activeElement, source);
        onAlign(source, result);

        return true;
      }

      return false;
    }, props.monitorBufferTime);

    // ===================== Effect =====================
    // Listen for target updated
    const resizeMonitor = ref<MonitorRef>({ cancel: () => {} });

    // Listen for source updated
    const sourceResizeMonitor = ref<MonitorRef>({ cancel: () => {} });

    watchEffect(
      () => {
        const element = getElement(props.target);
        const point = getPoint(props.target);

        if (nodeRef.value !== sourceResizeMonitor.value.element) {
          sourceResizeMonitor.value.cancel();
          sourceResizeMonitor.value.element = nodeRef.value;
          sourceResizeMonitor.value.cancel = monitorResize(
            nodeRef.value,
            forceAlign
          );
        }

        if (
          cacheRef.value.element !== element ||
          !isSamePoint(cacheRef.value.point, point)
        ) {
          forceAlign();

          // Add resize observer
          if (resizeMonitor.value.element !== element) {
            resizeMonitor.value.cancel();
            resizeMonitor.value.element = element;
            resizeMonitor.value.cancel = monitorResize(element, forceAlign);
          }
        }
      },
      { flush: 'post' }
    );

    // Listen for disabled change
    watch(disabledRef, (disabled) => {
      if (!disabled) {
        forceAlign();
      } else {
        cancelForceAlign();
      }
    });

    // Listen for window resize
    const winResizeRef = ref<{ remove: Function }>(null);

    watchEffect(() => {
      if (props.monitorWindowResize) {
        if (!winResizeRef.value) {
          winResizeRef.value = addEventListener(window, 'resize', forceAlign);
        }
      } else if (winResizeRef.value) {
        winResizeRef.value.remove();
        winResizeRef.value = null;
      }
    });

    // Clear all if unmount
    onUnmounted(() => {
      resizeMonitor.value.cancel();
      sourceResizeMonitor.value.cancel();

      if (winResizeRef.value) {
        winResizeRef.value.remove();
      }

      cancelForceAlign();
    });

    return {
      forceAlign: () => forceAlign(true),
      nodeRef
    };
  },

  render() {
    let childNode = this.$slots.default()[0];

    if (isVNode(childNode)) {
      childNode = cloneVNode(childNode, {
        ref: composeRef(childNode.ref, 'nodeRef')
      });
    }

    return childNode;
  }
});
