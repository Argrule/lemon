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

/**
 * @description 发布帖子
 * @param data.content 帖子内容
 * @param data.tagIds 帖子标签
 * @returns
 */
export const publishPost = async (data: {
  content: string;
  tagIds: number[];
}) => {
  const res = await o.post("/post/publish", data);
  return res.data;
};
