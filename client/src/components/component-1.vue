<template>
  <div>{{ componentName }} component works!</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export const Component1 = defineComponent({
  name: 'Component1',
  setup() {
    const componentName = ref<string>('Component1');

    return {
      componentName,
    };
  },
});
export default Component1;
</script>

<style lang="scss" scoped></style>
