<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Регистрация</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid:
          ($v.email.$dirty && !$v.email.required)
          || ($v.email.$dirty && !$v.email.email ) }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
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
            v-model.trim="password"
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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid">Введите ваше имя</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="checkbox"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="$v.$invalid"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      checkbox: false,
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    checkbox: { checked: (v) => v },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
        // eslint-disable-next-line
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss">
</style>
