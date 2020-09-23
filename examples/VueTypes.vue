<template>
  <Align :ref="alignRef">
    <span />
  </Align>

  <pre>{{
    JSON.stringify(
      state.props,
      (k, v) => (v === undefined ? '~undefined~' : v),
      2
    )
  }}</pre>
</template>

<script>
import Align from '../src';

export default {
  components: { Align },

  data() {
    return {
      state: { props: null }
    };
  },

  methods: {
    alignRef(node) {
      this.state.props = node ? { ...node.$props } : null;

      // eslint-disable-next-line no-console
      console.log(node);
    }
  }
};
</script>
