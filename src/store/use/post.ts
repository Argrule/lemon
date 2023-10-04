import { Item } from "$/pages/forum/data";
interface PostAction {
  type:string,
  data:Item
}
const EditPostInfo = "EditPostInfo"; //避免硬编码

// 修改post信息
export const updatePost = (data:Item):PostAction => {
  return {
    type: EditPostInfo,
    data,
  };
};
// 默认post信息
const postInfo:Item = {
  avatarUrl: "https://image.hangzhoukj.cn/avatar/default_avatar",
  collectNum: 6,
  collectStatus: false,
  content: "查消息模块和小工具",
  createTime: "2023-09-09 20:51:34.157",
  id: 34,
  images: ["https://image.hangzhoukj.cn/post/W2TxOj34_post"],
  likeNum: 5,
  likeStatus: false,
  nickname: "雾山小落",
  readNum: 0,
  schoolId: 1,
  tagName: ["日常生活"],
  uid: 1,
};

const post = (state = postInfo, action:PostAction):Item => {
  switch (action.type) {
    case EditPostInfo:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
export default post;
