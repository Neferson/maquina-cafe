import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import jQuery from 'jquery';
import PrettyCheckbox from 'pretty-checkbox-vue';

global.jQuery = jQuery
global.$ = jQuery

// habilita tooltip no Vue
$(() => {
  $('#app').tooltip({
    selector: '[data-toggle="tooltip"]'
  })
})

import VueSweetalert2 from 'vue-sweetalert2';

// imports de CSS
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSweetalert2);
Vue.use(PrettyCheckbox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
