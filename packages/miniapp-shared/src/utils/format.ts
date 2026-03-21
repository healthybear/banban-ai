/**
 * 通用格式化工具函数
 * 多个小程序共用的日期、数字等格式化逻辑
 */

/**
 * 格式化日期为 YYYY-MM-DD
 * @param date Date 对象或时间戳
 */
export function formatDate(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * 格式化餐次类型为中文
 * @param mealType 餐次英文标识
 */
export function formatMealType(mealType: string): string {
  const map: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '零食',
  };
  return map[mealType] ?? mealType;
}
