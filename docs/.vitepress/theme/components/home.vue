<template>
    <div class="home-wrapper">
      <!-- <div v-for="item in list" :key="item" class="home-item">{{ item }}</div> -->
      🌿 纸上得来终觉浅，绝知此事要躬行。 愿我们都能在代码与文字的世界里，找到自己的热爱。
    </div>
  </template>
  
  <script lang="ts" setup>
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  </script>
  
  <style scoped>
  .home-wrapper {
      
    display: flex;
    justify-content: center;
    margin-top: 80px;
  }
  .home-item {
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    font-weight: bolder;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    line-height: 13px;
    font-size: 13px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
  }
  </style>
  