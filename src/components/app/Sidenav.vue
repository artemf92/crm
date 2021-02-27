<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <li v-for="link in links"
      :key="link.url"
      :class="{ active: $route.path == link.url}">
      <router-link
        class="waves-effect waves-light pointer"
        :to="link.url"
        :exact="link.exact"
      >{{ link.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  name: 'Sidenav',
  data: () => ({
    links: [
      { name: 'Счет', url: '/', exact: true },
      { name: 'История', url: '/history' },
      { name: 'Планирование', url: '/planning' },
      { name: 'Новая запись', url: '/record' },
      { name: 'Категории', url: '/categories' },
    ],
  }),
};
</script>
