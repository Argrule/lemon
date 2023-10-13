import o from "$/utils/request";
interface MessageQueryParams {
  typeId: number;
  pageNum: number;
  pageSize: number;
}
interface MessageResponse {
  code: number;
  data: MessageData;
  message: string;
}
interface MessageData {
  msgDtoList: MessageItem[];
  total: number;
}
/**
 * @description 消息列表项
 * @param usename string --用户名
 * @param content string --消息内容
 * @param createTime string --消息创建时间
 */
export interface MessageItem {
  usename: string;
  content: string;
  createTime: string;
}
/**
 * @description 获取消息列表
 * @param params MessageQueryParams
 * @abstract typeId: number; --消息类型 0点赞 1评论
 * @returns
 */
export const getMessages = async (
  params: MessageQueryParams
): Promise<MessageData> => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  try {
    const res = (await o.get(
      `/msg/show?${paramsStr}`
    )) as any as MessageResponse;
    return res.data;
  } catch (e) {
    console.log("warning error manually:", e);
    return e;
  }
};
