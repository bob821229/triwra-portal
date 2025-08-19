<template>
  <div class="footer">
       Copyright (c) {{ year }} 台灣水資源與農業研究院 All rights reserved.
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const year = ref(new Date().getFullYear());
</script>

<style scoped lang="scss">
  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    background-color: rgb(255, 215, 0);
    width: 100%;
    height: 65px;
  }
</style>