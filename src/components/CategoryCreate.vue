<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальное значение {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button
        class="btn waves-effect waves-light"
        type="submit"
        :disabled="loading"
        >
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import M from 'materialize-css';

export default {
  name: 'CategoryCreate',
  data() {
    return {
      title: '',
      limit: 100,
      loading: false,
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        this.loading = true;
        const category = await this.$store.dispatch('categoryCreate', {
          title: this.title,
          limit: this.limit,
        });
        this.title = '';
        this.limit = 100;
        this.$v.$reset();
        this.$message('Категория создана');
        this.$emit('created', category);
        this.loading = false;
        // eslint-disable-next-line
      } catch (error) {}
    },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>

<style lang="scss">
</style>
