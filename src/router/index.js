import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/frontend/HomeView.vue";
import { useAuthStore } from "../stores/auth"; // 引入 store
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: { requiresAuth: false }, // 不需要登入
        },
        {
            path: "/DepartmentList",
            name: "DepartmentList",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/frontend/DepartmentListView.vue"),
            meta: { requiresAuth: false }, // 不需要登入
        },
        {
            path: "/SupervisorProfile/:manager/:title?",
            name: "SupervisorProfile",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/frontend/SupervisorProfileView.vue"),
            meta: { requiresAuth: false }, // 不需要登入
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../views/LoginView.vue"),
            meta: { requiresAuth: false }, // 登入頁也不需要登入
        },
        {
            path: "/backendHome",
            name: "backendHome",
            component: () => import("../views/backend/HomeView.vue"),
            meta: { requiresAuth: true }, // 後台需要登入
        },
        {
            path: "/backendDepartmentList",
            name: "backendDepartmentList",
            component: () => import("../views/backend/DepartmentListView.vue"),
            meta: { requiresAuth: true }, // 後台需要登入
        },
        {
            path: "/backendSupervisorProfile",
            name: "backendSupervisorProfile",
            component: () => import("../views/backend/SupervisorProfileView.vue"),
            meta: { requiresAuth: true }, // 後台需要登入
        },
    ],
});
// isAuthenticated() {
//     return !!localStorage.getItem("token");
// }
// 路由守衛
router.beforeEach((to, from, next) => {
   const authStore = useAuthStore(); // 使用 store
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next("/login"); // 沒登入 → 去登入頁
    } else {
        next();
    }
});
export default router;
