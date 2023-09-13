import { CommentData, Item, Tag } from "$/pages/forum/data";
import o from "$/utils/request";
import Taro from "@tarojs/taro";

interface BaseResponse<T = any> {
  code: string;
  data: any | T;
  message: string;
}
interface PostALLData extends BaseResponse {
  data: {
    list: Item[];
  };
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
 * @description 获取我的帖子列表
 * @param {number} params.pageNum
 * @param {number} params.pageSize
 * @returns
 */
export const getMyForumList = async (params: {
  pageNum: number;
  pageSize: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await o.get("/post/my/publish" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 获取我的收藏列表
 * @param {number} params.pageNum
 * @param {number} params.pageSize
 * @returns
 */
export const getMyCollectForumList = async (params: {
  pageNum: number;
  pageSize: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await o.get("/post/my/collect" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 创建帖子草稿
 */
export const CreateDraftAPI = async (): Promise<number> => {
  const data = (await o.put("/post/create")) as any;
  return data.data;
};
/**
 * @description 删除帖子草稿
 * @param draftId 草稿id
 */
export const DeleteDraftAPI = async (
  draftId: number
): Promise<BaseResponse> => {
  const res = (await o.delete("/post/cancel" + `?postId=${draftId}`)) as any;
  return res;
};
/**
 * @description 上传图片
 * @param file 图片文件的临时路径
 * @param postId 帖子id
 */
export const uploadImage = async (
  file: string,
  postId: number
): Promise<string> => {
  // const res = (await o.post("/post/upload", file, "application/form-data")) as any;
  return new Promise((resolve) => {
    Taro.uploadFile({
      url: "https://hangzhoukj.cn" + "/post/upload",
      filePath: file,
      name: "file",
      formData: {
        postId: postId,
      },
      header: {
        "content-type": "multipart/form-data",
        Authorization: Taro.getStorageSync("Authorization"),
      },
      success(res) {
        const data = res.data;
        //do something
        resolve(data);
        // return data;
      },
    });
  });
};
/**
 * @description 发布帖子
 * @param data.postId 帖子id
 * @param data.content 帖子内容
 * @param data.tagIds 帖子标签
 * @abstract tagIds由请求获取，描述帖子的tag
 */
export const publishPost = async (data: {
  content: string;
  tagIds: number[];
  postId: number;
}): Promise<BaseResponse> => {
  const res = (await o.post("/post/publish", data)) as any;
  return res;
};
// export const publishPost = async (data: {
//   content: string;
//   tagIds: number[];
//   files: File[];
// }): Promise<BaseResponse> => {
//   const res = (await o.post(
//     "/post/publish",
//     data,
//     "application/form-data"
//   )) as any;
//   return res;
// };

/**
 * @description 删除帖子
 * @param data.postId 帖子id
 */
export const deletePost = async (postId: number): Promise<BaseResponse> => {
  const res = (await o.delete("/post/delete" + `?postId=${postId}`)) as any;
  return res;
};

/**
 * @description 点赞帖子
 * @param postId 帖子id
 */
export const likePost = async (postId: number): Promise<BaseResponse> => {
  const res = (await o.post("/post/like", { postId })) as any;
  return res;
};
/**
 * @description 取消点赞帖子
 * @param postId 帖子id
 */
export const cancelLikePost = async (postId: number): Promise<BaseResponse> => {
  console.log("cancel like...");
  const res = (await o.post("/post/dislike", { postId })) as any;
  return res;
};
/**
 * @description 收藏帖子
 * @param postId 帖子id
 */
export const collectPost = async (postId: number): Promise<BaseResponse> => {
  const res = (await o.post("/post/collect", { postId })) as any;
  return res;
};
/**
 * @description 取消收藏帖子
 * @param postId 帖子id
 */
export const cancelCollectPost = async (
  postId: number
): Promise<BaseResponse> => {
  const res = (await o.post("/post/disCollect", { postId })) as any;
  return res;
};
/**
 * @description 展示评论
 * @param postId 帖子id
 */
export const getComment = async (postId: number): Promise<CommentData> => {
  const res = (await o.get("/post/comment/show" + `?postId=${postId}`)) as any;
  return res;
};
/**
 * @description 发布评论
 */
export const publishComment = async (data: {
  postId: number;
  content: string;
}): Promise<BaseResponse> => {
  const res = (await o.post("/post/comment", data)) as any;
  return res;
};

/**
 * @description 回复评论
 */
export const replyComment = async (data: {
  content: string;
  commentId: number;
}): Promise<BaseResponse> => {
  const res = (await o.post("/post/comment/reply", data)) as any;
  return res;
};

/**
 * @description 删除评论
 */
// export const deleteComment = async (commentId: number): Promise<BaseResponse> => {
//   const res = (await o.delete("/post/comment/delete" + `?commentId=${commentId}`)) as any;
//   return res;
// }

/**
 * @description 点赞评论
 */
// export const likeComment = async (commentId: number): Promise<BaseResponse> => {
//   const res = (await o.post("/post/comment/like", { commentId })) as any;
//   return res;
// }

/**
 * @description 搜索帖子
 * @param keyword 关键字
 */
export const searchPost = async (params: {
  pageNum: number;
  pageSize: number;
  content: string;
}): Promise<PostALLData> => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = (await o.get("/post/search" + `?${paramsStr}`)) as any;
  return res;
};

/**
 * @description 展示标签
 */
export const getTags = async (): Promise<BaseResponse<{ list: Tag[] }>> => {
  const res = (await o.get("/post/show/tags")) as any;
  return res;
};
