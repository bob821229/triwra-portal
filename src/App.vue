<template>
    <el-row class="row-bg" v-if="false">
        <el-col :span="6">
            <router-link to="/">home</router-link>
        </el-col>
        <el-col :span="6">
            <router-link to="/DepartmentList">DepartmentList</router-link>
        </el-col>
        <el-col :span="6">
            <router-link to="/SupervisorProfile">SupervisorProfile</router-link>
        </el-col>
    </el-row>

    <main>
        <RouterView />
    </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import CategoryCard from "@/components/CategoryCard.vue";

const input1 = ref("");
</script>

<style scoped>
main {
    min-height: 100vh;
    background: #f6f8fa;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-title {
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-bottom: 2rem;
    text-align: center;
}
.search-row {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    margin-bottom: 2.5rem;
}
.announce-btn {
    background: #fff;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #e5eaf1;
    font-size: 1.1rem;
    padding: 0.7rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: box-shadow 0.2s;
}
.announce-btn:hover {
    box-shadow: 0 4px 16px 0 #d1d8e0;
}
.announce-icon {
    font-size: 1.3rem;
}
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 900px;
    margin: 0 auto 2rem auto;
}
/* Icon 樣式 (可依需求換成 SVG 或組件) */
.icon-folder {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23eab308" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 0 1 2-2h4.465a2 2 0 0 1 1.414.586l1.535 1.535A2 2 0 0 0 13.172 7H20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"/></svg>')
        no-repeat center/contain;
}
.icon-search {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="%23678" stroke-width="2" fill="none"/><path d="M21 21l-4.35-4.35" stroke="%23678" stroke-width="2" stroke-linecap="round"/></svg>')
        no-repeat center/contain;
}
.icon-stethoscope {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v7a6 6 0 0 0 12 0V3" stroke="%23678" stroke-width="2" fill="none"/><circle cx="12" cy="17" r="3" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
}
.icon-plant {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21v-4M12 17c-4 0-7-3-7-7V5s3 0 7 4c4-4 7-4 7-4v5c0 4-3 7-7 7z" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
}
/* 子連結 icon (可依需求換 SVG) */
.icon-doc {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="%23678" stroke-width="2" fill="none"/><line x1="8" y1="8" x2="16" y2="8" stroke="%23678" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="%23678" stroke-width="2"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-clock {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="%23678" stroke-width="2" fill="none"/><path d="M12 7v5l3 3" stroke="%23678" stroke-width="2"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-case {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="%23678" stroke-width="2" fill="none"/><path d="M16 3h-8v4h8V3z" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-pc {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="12" rx="2" stroke="%23678" stroke-width="2" fill="none"/><rect x="8" y="19" width="8" height="2" rx="1" fill="%23678"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-book {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" stroke="%23678" stroke-width="2" fill="none"/><path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-building {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="%23678" stroke-width="2" fill="none"/><rect x="7" y="11" width="2" height="2" fill="%23678"/><rect x="11" y="11" width="2" height="2" fill="%23678"/><rect x="15" y="11" width="2" height="2" fill="%23678"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-heart {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23e11d48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6-4.35-9-8.5C-1.5 7.5 4.5 3 12 10.5 19.5 3 25.5 7.5 21 12.5c-3 4.15-9 8.5-9 8.5z" stroke="%23e11d48" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-user {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="%23678" stroke-width="2" fill="none"/><path d="M4 20v-1a8 8 0 0 1 16 0v1" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-star {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23eab308" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2" stroke="%23eab308" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-shield {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-server {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="6" rx="2" stroke="%23678" stroke-width="2" fill="none"/><rect x="3" y="14" width="18" height="6" rx="2" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-award {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23f59e42" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="6" stroke="%23f59e42" stroke-width="2" fill="none"/><path d="M8 16l-2 5 6-3 6 3-2-5" stroke="%23f59e42" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
</style>
