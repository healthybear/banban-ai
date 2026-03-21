/**
 * HTTP 请求工具
 * 基于 uni.request 封装，自动携带 JWT token
 * 所有小程序共用此工具，统一 API 基础路径
 */

// API 基础路径，从环境变量或配置读取
const BASE_URL = import.meta.env?.VITE_API_URL ?? 'http://localhost:3000';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: Record<string, unknown>;
  token?: string;
}

/**
 * 发起 API 请求
 * @param path API 路径，如 '/auth/login'
 * @param options 请求选项
 */
export function request<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', data, token } = options;
  const header: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${path}`,
      method,
      data,
      header,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(new Error(`请求失败：${res.statusCode}`));
        }
      },
      fail: (err) => reject(new Error(err.errMsg)),
    });
  });
}
