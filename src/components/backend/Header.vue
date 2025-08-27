<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        router
        @select="handleSelect"
    >
    isAuthenticated:{{ useAuthStore().isAuthenticated }}
    <div style="display: flex; align-items: center;margin:0 20px;">
        後台系統管理
    </div>
        <el-menu-item index="/backendHome">編輯連結</el-menu-item>
        <el-menu-item index="/backendDepartmentList">編輯所處</el-menu-item>
        <el-menu-item class="m-right" index="/backendSupervisorProfile">編輯主管個人資料</el-menu-item>

          <el-menu-item @click="useAuthStore().logout()">
                  登出
          </el-menu-item>
    </el-menu>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth"; // 引入 store

import { ref } from "vue";

const activeIndex = ref(null);
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
.float-right {
    margin-left: auto;
}
.m-right {
    margin-right: auto;
}
</style>
