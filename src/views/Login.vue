<template>
  <div>
    <form class="card auth-card" @submit.prevent="onSubmit">
      <div class="card-content">
        <span class="card-title">Авторизация</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{ invalid: ($v.email.$dirty && !$v.email.required)
            || ($v.email.$dirty && !$v.email.email) }"
          />
          <label for="email">Email</label>
          <small v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
          >Поле email должно быть заполнено</small>
          <small
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
          >Поле должно содержать email</small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="password"
            :class="{ invalid: ($v.password.$dirty && !$v.password.required)
            || ($v.password.$dirty && !$v.password.minLength) }"
            />
          <label for="password">Пароль</label>
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
          >Поле пароль должно быть заполнено</small>
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
          >Пароль должен состоять из {{ $v.password.$params.minLength.min }} символов</small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '../utils/messages';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required },
  },
  methods: {
    async onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (error) {
        // eslint-disable-next-line
      }
    },
  },
  mounted() {
    if (messages[this.$route.query.action]) {
      this.$message(messages[this.$route.query.action]);
    }
  },
};
</script>

<style lang="scss">
</style>
