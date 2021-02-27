<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="spinner">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {
      color: ['spinner-blue-only', 'spinner-red-only', 'spinner-green-only'],
    };
  },
  computed: {
    spinner() {
      return this.color[Math.floor(Math.random() * 3)];
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
</style>
