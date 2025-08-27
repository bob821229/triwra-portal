<template>
    <div class="content card_wrap">
        <h2 class="txt-color">{{ data.name }}</h2>
        <h3 v-if="data.title" class="txt-color">{{ data.title }}</h3>
        <span v-if="data.manager">主管: </span> 
         <router-link to="/">{{data.manager}}</router-link>
        {{ data.managerTitle }}
        <br>
        <span style="font-weight: bold;display: inline-block;margin-top: 5px;">
            核心業務
        </span>
        <ul>
            <li v-for="(item, index) in data.core" :key="index">
                <p>{{ item }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import {RouterLink} from 'vue-router';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});

</script>

<style scoped lang="scss">
.card_wrap{
}
.txt-color{
    color: #A47332;
}
</style>
