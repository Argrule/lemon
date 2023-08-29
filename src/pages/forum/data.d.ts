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
}

/**
 * @description: 帖子列表
 */
export interface Post {
  id: number;
  isDeleted: number;
  content: string;
  comments: string[];
  likes: number;
  collected: boolean;
}

/**
 * @description: 状态列表
 */
export interface State {
  posts: Item[];
  newPostContent: string;
  commentsList: CommentData[];

  // 是否展开评论
  showComment: boolean;
}

interface Reply {
  uid: number;
  content: string;
  createTime: string;
}

interface Comment {
  id: number;
  uid: number;
  content: string;
  createTime: string;
  replyList: Reply[];
}

interface CommentData {
  postId: number;
  list: Comment[];
}
