<template>
  <div>
    <Loader class="col s12 m6 align-center" v-if="loading"/>
    <div class="col s12 m6" v-else>
      <div>
        <div class="page-subtitle">
          <h4>Редактировать</h4>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="input-field">
            <select
              ref="select"
              v-model="current"
            >
              <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
              >{{c.title}}</option>
            </select>
            <label>Выберите категорию</label>
          </div>

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

          <button class="btn waves-effect waves-light" type="submit">
            Обновить
            <i class="material-icons right">send</i>
          </button>
          <button class="btn red waves-effect waves-light" @click.prevent="onDelete">
            <i class="material-icons">delete</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import M from 'materialize-css';

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      limit: 100,
      select: null,
      current: null,
      loading: true,
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
        await this.$store.dispatch('updateCategory', { id: this.current, title: this.title, limit: this.limit });
        this.$message('Категория успешно обновлена');
        this.$emit('updated', { id: this.current, title: this.title, limit: this.limit });
        // eslint-disable-next-line
      } catch (error) {
      }
    },
    async onDelete() {
      await this.$store.dispatch('delCategory', this.current);
      this.$message('Категория удалена');
      this.$emit('deletedCategory', this.current);
    },
  },
  watch: {
    current(value) {
      const { id, title, limit } = this.categories.find((cat) => cat.id === value);
      this.title = title;
      this.limit = limit;
      this.current = id;
    },
  },
  mounted() {
    this.loading = false;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      const { id, title, limit } = this.categories['0'];
      this.title = title;
      this.limit = limit;
      this.current = id;
    }, 300);
    setTimeout(() => { M.updateTextFields(); }, 310);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang="scss">
</style>
