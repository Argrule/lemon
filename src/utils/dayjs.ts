import dayjs from "dayjs";
// import isLeapYear from "dayjs/plugin/isLeapYear"; // 导入插件
import relativeTime from "dayjs/plugin/relativeTime"; // 导入插件
import "dayjs/locale/zh-cn"; // 导入本地化语言

// dayjs.extend(isLeapYear); // 使用插件
dayjs.extend(relativeTime); // 使用插件
dayjs.locale("zh-cn"); // 使用本地化语言

/**
 * @description 格式化时间转为距离当前时间的提示
 * @param string time
 * @returns 格式化后的时间提示
 */
export const FormatTimeFromNow = (time: string): string => {
  return dayjs(time).fromNow();
};
/**
 * @description 格式化时间转为距离当前时间的提示
 * @param string time
 * @returns 格式化后的时间提示
 */
export const FormatTimeYearMonthDay = (time: string): string => {
  return dayjs(time).format('YYYY-MM-DD');
};
