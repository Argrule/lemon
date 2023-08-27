/**
 * @description: 帖子列表项
 * @param {string} content 帖子内容
 * @param {string} createTime 创建时间
 * @param {number} id 帖子id
 * @param {number} isDeleted 是否删除
 * @param {number} readNum 阅读数
 * @param {number} schoolId 学校id
 * @param {number} uid 用户id
 * @param {string} updateTime 更新时间
 */
export interface Item {
  content: string;
  createTime: string;
  id: number;
  isDeleted: number;
  readNum: number;
  schoolId: number | null;
  uid: number;
  updateTime: string;
}

/**
 * @description: 帖子列表
 */
export interface Post {
  id: number;
  content: string;
  comments: string[];
  likes: number;
  collected: boolean;
}

/**
 * @description: 状态列表
 */
export interface State {
  posts: Post[];
  newPostContent: string;
  likedPosts: number[];
  collectedPosts: number[];
}
