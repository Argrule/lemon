/**
 * @description: 帖子列表项
 * @param {number} id 帖子id
 * @param {number} uid 用户id
 * @param {number} schoolId 学校id
 * @param {string} content 帖子内容
 * @param {number} readNum 阅读数
 * @param {number} likeNum 点赞数
 * @param {number} collectNum 收藏数
 * @param {number} likeStatus 点赞状态
 * @param {number} collectStatus 收藏状态
 * @param {string} createTime 创建时间
 * @param {string[]} tagName 标签名
 * @param {string[]} images 图片列表
 * @param {string} nickname 昵称
 * @param {string} avatarUrl 头像
 * @interface Item
 */
export interface Item {
  id: number;
  uid: number;
  schoolId: any | null;
  content: string;
  readNum: number;
  likeNum: number;
  collectNum: number;
  likeStatus: boolean;
  collectStatus: boolean;
  createTime: string;
  tagName?: string[];
  images?: string[];
  nickname: string;
  avatarUrl?: string;
}

/**
 * @description: 状态列表
 */
export interface State {
  posts: Item[];
  newPostContent: string;
  searchContent: string;
  hotPosts: Item[];
}

interface Reply {
  uid: number;
  content: string;
  createTime: string;
  nickname: string;
  avatarUrl?: string;
}

export interface Comment {
  id: number;
  uid: number;
  content: string;
  createTime: string;
  replyList: Reply[];
  nickname: string;
  avatarUrl?: string;
}

export interface CommentData {
  code: string;
  data: {
    postId: number;
    list: Comment[];
  };
  message: string;
}

export interface Tag {
  id: number;
  name: string;
}
