import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddCard from "@/components/AddCard";
import EditCard from "@/components/EditCard";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/add-card",
      name: "AddCard",
      component: AddCard
    },
    {
      path: "/edit-card/:card_id",
      name: "EditCard",
      component: EditCard
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    // If we are entering the homepage.
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next("/");
    else if (!requiresAuth && currentUser) next("/");
    else next();
  } else {
    // Not entering the homepage. Proceed as normal.
    next();
  }
});

export default router;
