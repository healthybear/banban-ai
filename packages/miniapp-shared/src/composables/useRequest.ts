import { ref } from 'vue';

/**
 * 通用请求 composable
 * 封装 uni.request，统一处理 loading 状态和错误
 * @param fn 异步请求函数
 */
export function useRequest<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function execute() {
    loading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : '请求失败';
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, execute };
}
