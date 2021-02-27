<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="cur of showCurrency"
              :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ currencies[cur].Value | currency() }}</td>
              <td>{{ curDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCurrency',
  props: ['rates', 'date'],
  data: () => ({
    showCurrency: ['EUR', 'USD'],
  }),
  computed: {
    currencies() {
      return this.rates;
    },
    curDate() {
      return new Date().toLocaleDateString(this.date);
    },
  },
};
</script>

<style lang="scss">
</style>
