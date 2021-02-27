<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p
          v-for="cur in showCurrency"
          :key="cur"
          class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  props: ['rates'],
  data() {
    return {
      showCurrency: ['RUB', 'USD', 'EUR'],
    };
  },
  methods: {
    getCurrency(cur) {
      if (cur === 'RUB') {
        return this.$store.getters.getInfo.bill;
      }
      return Math.floor(this.$store.getters.getInfo.bill * this.rates[cur]);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
</style>
