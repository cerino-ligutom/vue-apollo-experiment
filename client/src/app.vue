<template>
  <div class="container">
    <DemoUseQuery />
    <hr />
    <DemoUseMutation />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DemoUseQuery from '@/components/demo-use-query.vue';
import DemoUseMutation from '@/components/demo-use-mutation.vue';

export default defineComponent({
  name: 'App',
  components: {
    DemoUseQuery,
    DemoUseMutation,
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
