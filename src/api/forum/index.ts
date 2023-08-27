import o from "$/utils/request";

/**
 * @description 获取帖子列表
 * @param {number} params.pageNum
 * @param {number} params.pageSize
 * @returns
 */
export const getForumList = async (params: {
  pageNum: number;
  pageSize: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await o.get("/post/show" + `?${paramsStr}`);
  return res.data;
};
