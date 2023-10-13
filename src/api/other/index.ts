import o from "$/utils/request";

/**
 * @description 个人信息
 * @param amount number --点赞数
 * @param avatarUrl string --头像
 * @param collectNum number --收藏数
 * @param commentNum number --评论数
 * @param hashId string --用户hashId
 * @param nickname string --昵称
 * @param publishNum number --发布数
 * @param school string --学校
 */
export interface PersonInfo {
  amount: number;
  avatarUrl: string;
  collectNum: number;
  commentNum: number;
  hashId: string;
  nickname: string;
  publishNum: number;
  school: string;
}

export const getPersonInfo = async (): Promise<PersonInfo> => {
  const res = o.get("/user/info");
  return (await res).data;
};
