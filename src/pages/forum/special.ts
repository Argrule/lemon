import { Item } from "./data";

// const delay = 5 * 60 * 1000;// 5分钟
// const delay = 1 * 24 * 60 * 60 * 1000; // 1天
// const delay = 2 * 24 * 60 * 60 * 1000; // 2天
/**
 * @description 帖子特殊处理
 * @param post 帖子
 * @returns {boolean}
 * @abstract true 为特殊处理，false 为正常处理
 */
export default function SpecialDeal(post: Item): boolean {
  // 无内容,后端的bug
  if (post.content === undefined) {
    return true;
  }
  // 为了过审核，所以前两天不显示
  // if (new Date().getTime() < new Date(post.createTime).getTime() + delay) {
  //   return true;
  // }
  return false;
}
