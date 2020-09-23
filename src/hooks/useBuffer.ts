import { ref } from 'vue';

export default (callback: () => boolean, buffer: number) => {
  const calledRef = ref<boolean>(false);
  const timeoutRef = ref<number>(null);

  function cancelTrigger() {
    window.clearTimeout(timeoutRef.value);
  }

  function trigger(force?: boolean) {
    if (!calledRef.value || force === true) {
      if (callback() === false) {
        // Not delay since callback cancelled self
        return;
      }

      calledRef.value = true;
      cancelTrigger();

      timeoutRef.value = window.setTimeout(() => {
        calledRef.value = false;
      }, buffer);
    } else {
      cancelTrigger();
      timeoutRef.value = window.setTimeout(() => {
        calledRef.value = false;
        trigger();
      }, buffer);
    }
  }

  return [
    trigger,
    () => {
      calledRef.value = false;
      cancelTrigger();
    }
  ] as const;
};
