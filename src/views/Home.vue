<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        class="btn btn-small"
        @click="refresh"
        :disabled="loading"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>
    <div class="row" v-else >
      <HomeBill :rates="currency.rates"/>
      <HomeCurrency
        :rates="valutes.Valute"
        :date="valutes.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill.vue';
import HomeCurrency from '../components/HomeCurrency.vue';

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      currency: null,
      valutes: null,
    };
  },
  components: {
    HomeCurrency, HomeBill,
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  async mounted() {
    this.loading = true;
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.valutes = await this.$store.dispatch('fetchValutes');
    this.loading = false;
  },
};
</script>
