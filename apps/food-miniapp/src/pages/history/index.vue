<template>
  <!-- 历史记录页：展示用户的饮食记录列表 -->
  <view class="container">
    <view v-if="loading">加载中...</view>
    <view v-else-if="!records.length" class="empty">暂无记录</view>
    <view v-for="item in records" :key="item._id" class="record-item">
      <text class="desc">{{ item.description }}</text>
      <text class="meta">{{ formatMealType(item.mealType) }} · {{ item.calories ? item.calories + ' 千卡' : 'AI 分析中' }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formatMealType } from '@banban/miniapp-shared';

/**
 * 饮食历史页
 * 展示当前用户的所有饮食记录
 * TODO: 接入 food API 获取真实数据
 */
interface FoodRecord {
  _id: string;
  description: string;
  mealType?: string;
  calories?: number;
}

const records = ref<FoodRecord[]>([]);
const loading = ref(false);

onMounted(async () => {
  // TODO: 调用 food API
  loading.value = false;
});
</script>

<style scoped>
.container {
  padding: 40rpx;
}
.empty {
  text-align: center;
  color: #999;
  margin-top: 100rpx;
}
.record-item {
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}
.desc {
  font-size: 32rpx;
  display: block;
}
.meta {
  font-size: 26rpx;
  color: #999;
  margin-top: 8rpx;
  display: block;
}
</style>
