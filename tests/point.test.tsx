import Align from '../src';
import { mount } from '@vue/test-utils';

describe('point align', () => {
  it('not pass point', () => {
    const wrapper = mount(Align, {
      props: {
        align: { points: ['tc'] },
        target: null
      },

      slots: {
        default: () => (
          <div
            id="align"
            style={{ width: '20px', height: '20px', position: 'fixed' }}
          />
        )
      }
    });

    expect(wrapper.emitted()).not.toHaveProperty('align');
  });

  it('pass point', async () => {
    jest.useFakeTimers();

    const wrapper = mount(Align, {
      props: {
        align: { points: ['tc'] },
        target: null
      },

      slots: {
        default: () => (
          <div
            id="align"
            style={{ width: '20px', height: '20px', position: 'fixed' }}
          />
        )
      }
    });

    expect(wrapper.emitted()).not.toHaveProperty('align');

    await wrapper.setProps({ target: { pageX: 1128, pageY: 903 } });
    jest.runAllTimers();
    expect(wrapper.emitted()).toHaveProperty('align');

    jest.useRealTimers();
  });
});
