<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

</script>

<style>
::-webkit-scrollbar {
    /* 设置滚动条宽度 */
    width: 7px;
    /* 隐藏滚动条 */
    display: none;
}

::-webkit-scrollbar-thumb {
  /* 滚动条滑块的圆角 */
  border-radius: 8px;
  /* 滚动条滑块的背景颜色 */
  background-color: #03044a;
  /* 隐藏滚动条 */
  display: none;
}

::-webkit-scrollbar-track {
  /* 滚动条轨道的圆角 */
  border-radius: 8px;
  /* 滚动条轨道的背景颜色 */
  background-color: #03044a87;
  /* 隐藏滚动条 */
  display: none;
  /* 滚动条轨道的边框 蓝色实线 */
  border: 1px solid #03044a87
}

#app{
  font-family: Avenir, Arial, Helvetica, sans-serif;
  width: 100%;
  height: 100%
}
</style>