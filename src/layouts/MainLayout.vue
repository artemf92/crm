<template>
  <div>
    <Loader v-if='loading' />
    <div class='app-main-layout' v-else>
      <Navbar @hide='isOpen = !isOpen' />
      <Sidenav :value='isOpen' />

      <main class='app-content' :class='{ full: !isOpen }'>
        <div class='app-page'>
          <router-view></router-view>
        </div>
      </main>

      <div class='fixed-action-btn'>
        <router-link
          class='btn-floating btn-large blue'
          to='/record'
          v-tooltip.left="'Добавить запись'"
        >
          <i class='large material-icons'>add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar.vue';
import Sidenav from '../components/app/Sidenav.vue';

export default {
  name: 'MainLayout',
  components: {
    Sidenav,
    Navbar,
  },
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  methods: {},
  async mounted() {
    if (!Object.keys(this.$store.getters.getInfo).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
};
</script>

<style lang='scss'>
</style>
