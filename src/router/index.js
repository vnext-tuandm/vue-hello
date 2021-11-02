import { createWebHistory, createRouter } from "vue-router";
import DashboardUser from "../components/users/dashboard/Dashboard.component.vue";
import DashboardAdmin from "../components/admins/dashboard/Dashboard.component.vue";
import Login from "../components/globals/login/Login.component.vue";

const routes = [
  {
    path: "/user",
    name: "DashboardUser",
    component: DashboardUser,
    meta: {
        requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "DashboardAdmin",
    component: DashboardAdmin,
    meta: {
        requiresAuth: true,
        is_admin : true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
        guest: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        console.log(to.matched)
        if (to.matched.some(record => record.meta.is_admin)) {
          if (user.is_admin == 1) {
            next()
          } else {
            next({ name: 'DashboardUser' })
          }
        } else {
          next()
        }
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      if (localStorage.getItem('jwt') == null) {
        next()
      } else {
        next({ name: 'DashboardUser' })
      }
    } else {
      next()
    }
})

export default router;