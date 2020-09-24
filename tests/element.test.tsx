import Align from '../src';

import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

describe('element align', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const align = {
    points: ['bc', 'tc']
  };

  const Test = defineComponent({
    methods: {
      getTarget() {
        return this.$target;
      },

      targetRef(ele) {
        this.$target = ele;
      }
    },

    render() {
      return (
        <div style={{ paddingTop: '100px' }}>
          <div
            ref={this.targetRef}
            style={{ display: 'inline-block', width: '50px', height: '50px' }}
          >
            target
          </div>

          <Align target={this.getTarget} align={align} {...this.$attrs}>
            <div
              id="ele_src"
              style={{
                position: 'absolute',
                width: '50px',
                height: '80px'
              }}
            >
              source
            </div>
          </Align>
        </div>
      );
    }
  });

  it('resize', async () => {
    const onAlign = jest.fn();

    const wrapper = mount(Test as any, {
      props: {
        monitorWindowResize: true,
        onAlign
      }
    });

    expect(onAlign).toHaveBeenCalled();

    // Window resize
    onAlign.mockReset();
    window.dispatchEvent(new Event('resize'));
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(onAlign).toHaveBeenCalled();

    // Not listen resize
    onAlign.mockReset();
    await wrapper.setProps({ monitorWindowResize: false });
    window.dispatchEvent(new Event('resize'));
    jest.runAllTimers();
    expect(onAlign).not.toHaveBeenCalled();

    // Remove should not crash
    await wrapper.setProps({ monitorWindowResize: true });
    wrapper.unmount();
  });

  it('disabled should trigger align', async () => {
    const onAlign = jest.fn();

    const wrapper = mount<any>(Test, {
      props: {
        monitorWindowResize: true,
        disabled: true,
        onAlign
      }
    });

    expect(onAlign).not.toHaveBeenCalled();

    await wrapper.setProps({ disabled: false });
    jest.runAllTimers();
    expect(onAlign).toHaveBeenCalled();
  });
});
