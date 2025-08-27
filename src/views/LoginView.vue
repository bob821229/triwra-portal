<template>
    <div class="login-container">
        <h1>後台登入頁面</h1>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" size="large">
            <el-form-item prop="username">
                <el-input
                    prefix-icon="User"
                    v-model="loginForm.username"
                    placeholder="請輸入帳號"
                ></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                    type="password"
                    prefix-icon="Lock"
                    v-model="loginForm.password"
                    placeholder="請輸入密碼"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleLogin">登入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from 'axios';
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth"; // 引入 store

const router = useRouter();
const authStore = useAuthStore(); // 使用 store

const loginForm = reactive({
    username: "admin",
    password: "123456",
});

const loginRules = {
    username: [
        { required: true, message: "請輸入帳號", trigger: "blur" },
        // {
        //     min: 3,
        //     max: 15,
        //     message: "用户名长度在3到15个字符",
        //     trigger: "blur",
        // },
    ],
    password: [
        { required: true, message: "請輸入密碼", trigger: "blur" },
        // { min: 6, max: 20, message: "密码长度在6到20个字符", trigger: "blur" },
    ],
};

const loginFormRef = ref(null);

const handleLogin = async () => {
    try {
        await loginFormRef.value.validate(async (valid) => {
            if (valid) {

                // 模擬登入邏輯
                if (loginForm.username === "admin" && loginForm.password === "123456") {
                    ElMessage({
                            message: "登入成功",
                            type: "success",
                        });
                         authStore.login("mock-token"); // 存入 token
                        router.push("/backendHome"); // 登入成功後跳轉到後台首頁
                }else {
                    ElMessage({
                        message: "登入失敗，請檢查帳號或密碼",
                        type: "error",
                    });
                    return;
                }
                // 以下正式的登入邏輯
                if(false){
                    // 使用 axios 發送登入請求
                    const response = await axios.post("/api/login", loginForm)
    
                    if (response.ok) {
                        const data = await response.json();
                        ElMessage({
                            message: "登入成功",
                            type: "success",
                        });
                        // 登入成功後，將 token 存儲在 localStorage 中
                        // window.location.href = "/";
                    } else {
                        ElMessage({
                            message: "登入失敗",
                            type: "error",
                        });
                    }
                }
            }
        });
    } catch (error) {
        console.error("登入失敗:", error);
        ElMessage({
            message: "登入失敗，請檢查帳號或密碼",
            type: "error",
        });
    }
};
</script>

<style scoped lang="scss">
.login-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    // background-color: #f2f2f2;
        background-image: linear-gradient(90deg, #0080ff, #00b2ff 50%, #00dae5);

}

.el-form {
    width: 300px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.el-form-item {
    margin-bottom: 20px;
}

.el-input {
    width: 100%;
}

.el-button {
    width: 100%;
        background-image: linear-gradient(90deg, #0080ff, #00b2ff 50%, #00dae5);
}
</style>
