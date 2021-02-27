<template>
  <div id="app">
    <component :is="layout">
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'empty-layout';
    },
  },
  components: {
    EmptyLayout, MainLayout,
  },
};
</script>

<style lang="scss">
@import './assets/css/index.css';
@import '~materialize-css/dist/css/materialize.min.css';

</style>
