import Vuelidate from 'vuelidate';
import messagesPlugin from '@/utils/messages.plugin';
import firebase from 'firebase/app';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import currencyFilter from './filters/currency.filter';
import Loader from './components/Loader.vue';
import tooltip from './directives/tooltip.directive';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagesPlugin);
Vue.use(firebase);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);
Vue.directive('tooltip', tooltip);

firebase.initializeApp({
  apiKey: 'AIzaSyBnusyRXkzaMeNQhEAwO7qs6gJCBXzjLEs',
  authDomain: 'vue-crm-b887e.firebaseapp.com',
  projectId: 'vue-crm-b887e',
  storageBucket: 'vue-crm-b887e.appspot.com',
  messagingSenderId: '650141803783',
  appId: '1:650141803783:web:6004e87e5eef361d8851a2',
  measurementId: 'G-MXER693RJ6',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
