import { ref, computed } from 'vue';

/**
 * 用户状态 composable
 * 管理当前登录用户信息和 JWT token
 * 多个小程序共用，避免重复实现
 */

// 简单存储，后续可替换为 Pinia store
const token = ref<string | null>(uni.getStorageSync('token') || null);
const userInfo = ref<{ userId: string; phone: string } | null>(null);

export function useUser() {
  const isLoggedIn = computed(() => !!token.value);

  /** 登录后保存 token */
  function setToken(t: string) {
    token.value = t;
    uni.setStorageSync('token', t);
  }

  /** 退出登录，清除 token */
  function logout() {
    token.value = null;
    userInfo.value = null;
    uni.removeStorageSync('token');
  }

  return { token, userInfo, isLoggedIn, setToken, logout };
}
