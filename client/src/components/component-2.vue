<template>
  <div>{{ componentName }} component works!</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export const Component2 = defineComponent({
  name: 'Component2',
  setup() {
    const componentName = ref<string>('Component2');

    return {
      componentName,
    };
  },
});
export default Component2;
</script>

<style lang="scss" scoped></style>
