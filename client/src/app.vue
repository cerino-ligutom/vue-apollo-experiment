<template>
  <div class="container">
    <Component0 />
    <!-- <Component1 /> -->
    <!-- <Component2 /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Component0 from '@/components/component-0.vue';
import Component1 from '@/components/component-1.vue';
import Component2 from '@/components/component-2.vue';

export default defineComponent({
  name: 'App',
  components: {
    Component0,
    // Component1,
    // Component2,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
