<template>
  <nav class="navbar blue-grey darken-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('hide')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down"
          >
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ info.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a @click.prevent="logout" class="black-text" href="#">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css';

export default {
  name: 'Navbar',
  data: () => ({
    date: new Date().toLocaleDateString(),
    interval: null,
    dropdown: null,
  }),
  computed: {
    info() {
      return this.$store.getters.getInfo;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?action=logout');
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date().toLocaleDateString();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {});
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style>
</style>
