<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNew"/>
        <CategoryEdit
          :categories="categories"
          :key="categories.length + updateCount"
          v-if="categories.length"
          @updated="onUpdate"
          @deletedCategory="onDeleted"
        />
        <p class="center-align" v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate.vue';
import CategoryEdit from '../components/CategoryEdit.vue';

export default {
  name: 'Categories',
  components: {
    CategoryEdit, CategoryCreate,
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  methods: {
    addNew(category) {
      this.categories.push(category);
    },
    onUpdate({ id, title, limit }) {
      const idx = this.categories.findIndex((cat) => cat.id === id);
      this.categories[idx].title = title;
      this.categories[idx].limit = limit;
      // eslint-disable-next-line
      this.updateCount++;
    },
    onDeleted(id) {
      const idx = this.categories.findIndex((cat) => id === cat.id);
      this.categories.splice(idx, 1);
      // eslint-disable-next-line
      this.updateCount--;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
};
</script>

<style lang="scss">
</style>
