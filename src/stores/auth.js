import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const isLoggedIn = computed(() => localStorage.getItem("token")); // 初始值從 localStorage 中讀取);
    function login(token) {
        isAuthenticated.value = true;
        localStorage.setItem("token", token); // 將 token 存入 localStorage
    }
    function logout() {
        isAuthenticated.value = false;
        localStorage.removeItem("token"); // 清除 token
    }
    return { login, logout, isLoggedIn,isAuthenticated };
});
