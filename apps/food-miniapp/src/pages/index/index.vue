<template>
  <!-- 首页：快速记录入口 -->
  <view class="container">
    <text class="title">今天吃了什么？</text>
    <button @tap="goRecord">记录饮食</button>
    <button @tap="goHistory">查看记录</button>
  </view>
</template>

<script setup lang="ts">
/**
 * 首页
 * 提供快速入口：记录饮食 / 查看历史
 */
function goRecord() {
  uni.navigateTo({ url: '/pages/record/index' });
}

function goHistory() {
  uni.navigateTo({ url: '/pages/history/index' });
}
</script>

<style scoped>
.container {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.title {
  font-size: 40rpx;
  font-weight: bold;
}
</style>
