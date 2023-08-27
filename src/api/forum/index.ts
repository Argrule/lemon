import o from "$/utils/request";

interface BaseResponse {
  code: string;
  data: any;
  message: string;
}
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
}): Promise<BaseResponse> => {
  const res = (await o.post("/post/publish", data)) as any;
  return res;
};

/**
 * @description 删除帖子
 * @param data.postId 帖子id
 */
export const deletePost = async (postId: number): Promise<BaseResponse> => {
  const res = (await o.delete("/post/delete" + `?postId=${postId}`)) as any;
  return res;
};
