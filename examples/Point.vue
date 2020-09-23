<template>
  <div :style="{ marginBottom: '170px' }">
    <div
      :style="{
        margin: '20px',
        border: '1px solid red',
        padding: '100px 0',
        textAlign: 'center'
      }"
      @click="onClick"
    >
      Click this region please : )
    </div>

    <Align :target="state.point" :align="{ points: ['cc', 'cc'] }">
      <div
        :style="{
          position: 'absolute',
          width: '100px',
          height: '100px',
          background: 'rgba(0, 255, 0, 0.5)',
          pointerEvents: 'none'
        }"
      >
        Align
      </div>
    </Align>
  </div>
</template>

<script>
import Align from '../src';

export default {
  components: { Align },

  data() {
    return {
      state: {
        point: null
      }
    };
  },

  methods: {
    onClick({ pageX, pageY }) {
      this.state.point = { pageX, pageY };
    }
  }
};
</script>
