<template>
  <div :style="{ margin: '50px' }">
    <p>
      <button type="button" @click="forceAlign">Force align</button>
      &nbsp;&nbsp;&nbsp;
      <button type="button" @click="toggleSourceSize">Resize Source</button>
      &nbsp;&nbsp;&nbsp;
      <label>
        <input
          type="checkbox"
          :checked="state.monitor"
          @change="toggleMonitor"
        />
        Monitor window resize
      </label>
      <label>
        <input type="checkbox" :checked="state.random" @change="toggleRandom" />
        Random Size
      </label>
      <label>
        <input
          type="checkbox"
          :checked="state.disabled"
          @change="toggleDisabled"
        />
        Disabled
      </label>
    </p>

    <div
      id="container"
      :ref="containerRef"
      :style="{
        border: '1px solid red',
        width: '80%',
        height: '500px',
        ...(state.random ? { width: `${state.randomWidth}%` } : null)
      }"
    >
      <Align
        :ref="alignRef"
        :target="getTarget"
        :monitor-window-resize="state.monitor"
        :align="state.align"
        :disabled="state.disabled"
      >
        <div
          :style="{
            position: 'absolute',
            width: `${state.sourceWidth}px`,
            height: '50px',
            background: 'yellow'
          }"
        >
          <input :style="{ width: '100%' }" />
        </div>
      </Align>
    </div>
  </div>
</template>

<script>
import Align from '../src';

export default {
  components: { Align },

  data() {
    return {
      state: {
        monitor: true,
        random: false,
        disabled: false,
        randomWidth: 100,
        align: {
          points: ['cc', 'cc']
        },
        sourceWidth: 50
      }
    };
  },

  mounted() {
    this.id = setInterval(() => {
      const { random } = this.state;

      if (random) {
        this.state.randomWidth = 60 + 40 * Math.random();
      }
    }, 1000);
  },

  beforeUnmount() {
    clearInterval(this.id);
  },

  methods: {
    getTarget() {
      if (!this.$container) {
        // parent ref not attached
        this.$container = document.getElementById('container');
      }

      return this.$container;
    },

    containerRef(ele) {
      this.$container = ele;
    },

    alignRef(node) {
      this.$align = node;
    },

    toggleMonitor() {
      this.state.monitor = !this.state.monitor;
    },

    toggleRandom() {
      this.state.random = !this.state.random;
    },

    toggleDisabled() {
      this.state.disabled = !this.state.disabled;
    },

    forceAlign() {
      this.$align.forceAlign();
    },

    toggleSourceSize() {
      this.state.sourceWidth = this.state.sourceWidth + 10;
    }
  }
};
</script>
