import request from "$/utils/request";

/**
 * @description 获取攒局列表
 * @param {number} params.pageNum
 * @param {number} params.tagId
 * @returns
 */
export const getGatherList = async (params: {
  pageNum: number;
  tagId: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/team/show" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 获取攒局标签列表
 * @returns
 */
export const getTagList = async (params: {}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/team/show/tags" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 创建攒局
 * @param {string} params.topic
 * @param {string} params.description
 * @param {number} params.maxNum
 * @param {number} params.tagId
 * @returns
 */
export const createGather = async (params: {
  topic: string;
  description: string;
  maxNum: number;
  tagId: number;
}) => {
  // const paramsStr = Object.keys(params)
  //   .map((key) => `${key}=${params[key]}`)
  //   .join("&");
  const res = await request.post("/team/create", params);
  return res;
};

/**
 * @description 获取攒局标签列表
 * @returns
 */
export const joinGather = async (params: {
  teamId:number
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.post("/team/join" + `?${paramsStr}`);
  return res;
};
