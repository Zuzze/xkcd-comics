import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Comic from "../views/Comic.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/:id",
    component: Comic,
    name: "comic"
    // route level code-splitting if bigger chunks of app added that are not needed to add immediately
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //  import(/* webpackChunkName: "page" */ "../views/page.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
