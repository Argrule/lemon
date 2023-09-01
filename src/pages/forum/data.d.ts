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
 * @param {string[]} tagNames 标签名
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
}

/**
 * @description: 状态列表
 */
export interface State {
  posts: Item[];
  newPostContent: string;
  searchContent: string;
}

interface Reply {
  uid: number;
  content: string;
  createTime: string;
}

export interface Comment {
  id: number;
  uid: number;
  content: string;
  createTime: string;
  replyList: Reply[];
}

export interface CommentData {
  code: string;
  data: {
    postId: number;
    list: Comment[];
  };
  message: string;
}
