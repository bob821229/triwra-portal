<template>
    <!-- <div class="category-card">
        <div class="category-icon">
            <slot name="icon"></slot>
        </div>
        <h3 class="category-title">{{ title }}</h3>
        <ul class="category-links">
            <li v-for="item in items" :key="item.text">
                <template v-if="item.link?.startsWith('http') && item.link!=null">
                    <a
                        class="category-link"
                        :href="item.link"
                        target="_blank"
                        rel="noopener"
                    >
                        <span v-if="item.link!='/'"> 🌻 </span> {{ item.text }}
                    </a>
                </template>
                <template v-else>
                    <router-link class="category-link" :to="item.link">
                        <span v-if="item.link!='/'"> 🌻 </span> {{ item.text }}
                    </router-link>
                </template>
            </li>
        </ul>
    </div> -->
     <div class="category-card">
        <div class="category-icon">
            <slot name="icon"></slot>
        </div>
        <h3 class="category-title">{{ title }}</h3>
        <ul class="category-links">
            <li v-for="(item, idx) in items" :key="item.text">
                <!-- 有 list 屬性時，顯示展開按鈕 -->
                <template v-if="item.list">
                    <a
                        class="category-link"
                        href="javascript:void(0);"
                        @click="toggle(idx)"
                    >
                        <span>🌻</span> {{ item.text }}
                        <!-- <span style="font-size:0.9em;">{{ openIdx === idx ? '▲' : '▼' }}</span> -->
                    </a>
                    <ul v-if="openIdx === idx" class="sub-list">
                        <li v-for="sub in item.list" :key="sub.text">
                            <a
                                class="category-link"
                                :href="sub.link"
                                target="_blank"
                                rel="noopener"
                            >
                                {{ sub.text }}
                            </a>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <template v-if="(item.link?.startsWith('http') || item.link?.startsWith('data')) && item.link!=null">
                        <a
                            class="category-link"
                            :href="item.link"
                            target="_blank"
                            rel="noopener"
                        >
                            <span v-if="item.link!='/'"> 🌻 </span> {{ item.text }}
                        </a>
                    </template>
                    <template v-else>
                        <router-link class="category-link" :to="item.link">
                            <span v-if="item.link!='/'"> 🌻 </span> {{ item.text }}
                        </router-link>
                    </template>
                </template>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps,ref } from "vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
        // [{ text: string, link: string, icon?: string }]
    },
});
const openIdx = ref(null);
function toggle(idx) {
    openIdx.value = openIdx.value === idx ? null : idx;
}

</script>

<style scoped>
.category-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px 0 #e5eaf1;
    padding: 2rem;
    text-align: left;
    max-width: 260px; 
    min-width: 220px;
    margin: 0 auto;
    height: 100%;
    transition: box-shadow 0.2s, transform 0.2s;
}

.category-card:hover {
    box-shadow: 0 4px 16px 0 #d1d8e0;
    transform: translateY(-2px) scale(1.02);
}

.category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.category-title {
    font-size: 1.35rem;
    font-weight: 600;
    text-align: center;
    margin: 0.5rem 0 1rem 0;
}

.category-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.category-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #2563eb;
    font-size: 1.08rem;
    text-decoration: none;
    padding: 0.3rem 0;
    transition: color 0.15s;
}

.category-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
}
</style>
