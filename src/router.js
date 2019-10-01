import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Maquina from "./components/Machine.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "maquina",
      component: Maquina

    },
  ]
});
