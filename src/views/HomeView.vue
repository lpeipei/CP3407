<template>
  <div :class="s.main">
    <van-button type="primary" :class="s.item">主要按钮</van-button>
    <van-button type="success" :class="s.item">成功按钮</van-button>
    <van-button type="default" :class="s.item">默认按钮</van-button>
    <van-button type="warning" :class="s.item">警告按钮</van-button>
    <van-button type="danger" :class="s.item">危险按钮</van-button>
  </div>
</template>
<script setup>

</script>
<style scoped module='s'>
.main {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  margin-right: 2rem;
  margin-top: 2rem;
}

</style>
