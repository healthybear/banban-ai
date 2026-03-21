<template>
  <!-- 饮食记录页：用户输入本次饮食内容 -->
  <view class="container">
    <textarea
      v-model="description"
      placeholder="描述你吃了什么，例如：午饭吃了一碗牛肉面"
      :maxlength="200"
    />
    <picker :range="mealTypeOptions" @change="onMealTypeChange">
      <view>餐次：{{ mealTypeOptions[mealTypeIndex] }}</view>
    </picker>
    <button @tap="submit" :disabled="loading">提交记录</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRequest } from '@banban/miniapp-shared';
import { useUser } from '@banban/miniapp-shared';

/**
 * 饮食记录页
 * 用户输入饮食描述，提交后由后端 AI 分析卡路里
 * TODO: 接入 food API
 */
const description = ref('');
const mealTypeOptions = ['早餐', '午餐', '晚餐', '零食'];
const mealTypeKeys = ['breakfast', 'lunch', 'dinner', 'snack'];
const mealTypeIndex = ref(1); // 默认午餐

const { token } = useUser();
const { loading, execute } = useRequest(async () => {
  // TODO: 调用 food API
  console.log('submit', description.value, mealTypeKeys[mealTypeIndex.value], token.value);
});

function onMealTypeChange(e: { detail: { value: number } }) {
  mealTypeIndex.value = e.detail.value;
}

async function submit() {
  if (!description.value.trim()) {
    uni.showToast({ title: '请输入饮食描述', icon: 'none' });
    return;
  }
  await execute();
  uni.showToast({ title: '记录成功' });
  uni.navigateBack();
}
</script>

<style scoped>
.container {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
textarea {
  width: 100%;
  min-height: 200rpx;
  border: 1rpx solid #eee;
  padding: 20rpx;
  border-radius: 8rpx;
}
</style>
