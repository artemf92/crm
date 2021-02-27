<template>
  <div>
    <div class='page-title'>
      <h3>Планирование</h3>
      <h4 v-tooltip.left="'Общий бюджет'">{{ getInfo.bill | currency }}</h4>
    </div>
    <Loader v-if="loading"/>
    <p class="center-align" v-else-if="!categories.length">Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link></p>
    <section v-else>
      <div v-for='c in categories' :key='c.id' v-tooltip='c.tooltip'>
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.result | currency }} из {{ c.limit | currency }}
        </p>
        <div
          class='progress'
        >
          <div
            class='determinate'
            :class='[c.progressColor]'
            :style="{ width: c.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currency from '../filters/currency.filter';

export default {
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: [],
      records: [],
    };
  },
  computed: {
    ...mapGetters(['getInfo']),
  },
  methods: {},
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = categories.map((cat) => {
      const result = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        // eslint-disable-next-line
        .reduce((sum, currentValue) => {
          // eslint-disable-next-line
          return (sum += +currentValue.amount);
        }, 0);
      const percent = (100 * result) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      let progressColor = '';
      if (percent < 60) {
        progressColor = 'green';
      } else if (percent >= 100) {
        progressColor = 'red';
      } else {
        progressColor = 'orange';
      }
      const tooltip = result > 0
        ? `Осталось ${currency(cat.limit - result)}`
        : `Превышает на ${currency(result - cat.limit)}`;
      return {
        ...cat,
        result,
        percent,
        tooltip,
        progressPercent,
        progressColor,
      };
    });
    this.loading = false;
  },
};
</script>

<style lang='scss'>
</style>
