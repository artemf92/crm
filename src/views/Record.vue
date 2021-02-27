<template>
  <div>
    <div class='page-title'>
      <h3>Новая запись</h3>
    </div>
    <Loader v-if='loading' />
    <p
      class="center-align"
      v-else-if="!categories.length"
    >
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <form class='form' @submit.prevent='onSubmit' v-else>
      <select v-model='category' ref='select'>
        <option v-for='c of categories' :key='c.id' :value='c.id'>
          {{ c.title }}
        </option>
      </select>
      <label>Выберите категорию</label>

      <p>
        <label>
          <input
            class='with-gap'
            name='type'
            type='radio'
            v-model='typeAmount'
            value='income'
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class='with-gap'
            name='type'
            type='radio'
            v-model='typeAmount'
            value='outcome'
          />
          <span>Расход</span>
        </label>
      </p>

      <div class='input-field'>
        <input
          id='amount'
          type='number'
          v-model.number='amount'
          :class='{ invalid: $v.amount.$dirty && !$v.amount.minValue }'
        />

        <label for='amount'>Сумма</label>
        <span
          class='helper-text invalid'
          v-if='$v.amount.$dirty && !$v.amount.minValue'
          >Минимальное значение {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class='input-field'>
        <input
          id='description'
          type='text'
          v-model='description'
          :class='{
            invalid: $v.description.$dirty && !$v.description.required,
          }'
        />
        <label for='description'>Описание</label>
        <span
          class='helper-text invalid'
          v-if='$v.description.$dirty && !$v.description.required'
          >Введите описание</span
        >
      </div>

      <button class='btn waves-effect waves-light' type='submit'>
        Создать
        <i class='material-icons right'>send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import M from 'materialize-css';
import { mapGetters } from 'vuex';

export default {
  name: 'Record',
  data() {
    return {
      categories: [],
      select: null,
      loading: true,
      category: null,
      typeAmount: 'outcome',
      amount: 1,
      description: '',
    };
  },
  computed: {
    ...mapGetters(['getInfo']),
    canCreateRecord() {
      if (this.typeAmount === 'income') {
        return true;
      }
      return this.getInfo.bill >= this.amount;
    },
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1) },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            type: this.typeAmount,
            description: this.description,
            date: new Date().toJSON(),
          });
          const bill = this.typeAmount === 'income'
            ? this.getInfo.bill + this.amount
            : this.getInfo.bill - this.amount;
          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        // eslint-disable-next-line
        } catch (error) {}
      } else {
        this.$message(`На счете не хватает средств(${this.amount - this.getInfo.bill} ₽)`);
      }
    },
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.category = this.categories[0].id;
      this.loading = false;
      await this.$nextTick;
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
      //  eslint-disable-next-line
    } catch (error) {}
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang='scss'>
</style>
