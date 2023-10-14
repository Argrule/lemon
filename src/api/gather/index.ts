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
 * @description 获取攒局总人数
 * @returns
 */
export const getCount = async (params: {}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/team/count" + `?${paramsStr}`);
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
 * @description 加入组队
 * @param {number} params.teamId
 * @returns
 */
export const joinGather = async (params: { teamId: number }) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.post("/team/join" + `?${paramsStr}`);
  return res;
};

/**
 * @description 获取我的组队
 * @param {number} params.pageNum
 * @param {number} params.pageSize
 * @param {number} params.tagId
 * @returns
 */
export const getTeamList = async (params: {
  tagId: number,
  pageNum: number;
  pageSize: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/team/my/join" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 获取我创建的组队
 * @param {number} params.pageNum
 * @param {number} params.pageSize
 * @param {number} params.tagId
 * @returns
 */
export const getMyTeamList = async (params: {
  tagId: number,
  pageNum: number;
  pageSize: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/team/my/create" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 退出组队
 * @param {number} params.teamId
 * @returns
 */
export const quitGather = async (params: { teamId: number }) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.post("/team/leave" + `?${paramsStr}`);
  return res;
};

/**
 * @description 删除组队
 * @param {number} params.teamId
 * @returns
 */
export const deleteGather = async (params: { teamId: number }) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.delete("/team/delete" + `?${paramsStr}`);
  return res;
};

/**
 * @description 搜索攒局
 * @param {number} params.pageNum
 * @param {string} params.topic
 * @returns
 */
export const searchTeamList = async (params: {
  pageNum: number;
  topic: string;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/team/search" + `?${paramsStr}`);
  return res.data;
};

/**
 * @description 获取个人信息
 * @param {number} params.userId
 * @returns
 */
export const getUserInfo = async (params: {
  userId: number;
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const res = await request.get("/user/info" + `?${paramsStr}`);
  return res.data;
};
