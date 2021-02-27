<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from '../utils/messages';

export default {
  name: 'EmptyLayout',
  data() {
    return {
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(value) {
      if (value != null) {
        this.$error(messages[value] || 'Что-то пошло не так...');
      }
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
</style>
