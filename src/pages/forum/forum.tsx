import { Component } from "react";
import { View, Text, Button, Input, BaseEventOrig } from "@tarojs/components";
import "./forum.scss";
import { InputEventDetail } from "taro-ui/types/input";
import {
  deletePost,
  getForumList,
  publishPost,
  likePost,
  cancelLikePost,
} from "$/api/forum";
import { Item, State } from "./data";

class Forum extends Component<{}, State> {
  /* 状态 */
  state: State = {
    posts: [], // 帖子列表
    newPostContent: "", // 新帖子内容
    collectedPosts: [], // 已收藏的帖子id列表
  };
  /* 生命周期 */
  async componentDidMount() {
    const res = (await getForumList({
      pageNum: 1,
      pageSize: 10,
    })) as { list: Item[] };
    this.setState({ posts: res.list });
  }
  /**
   * @description 输入框内容变化
   * @param event
   */
  handleNewPostChange = (event: BaseEventOrig<InputEventDetail>) => {
    this.setState({ newPostContent: event.detail.value as string });
  };
  /**
   * @description 发布新帖子
   */
  handleNewPostSubmit = async () => {
    const { newPostContent, posts } = this.state;
    if (!newPostContent) {
      console.log("请输入内容");
      return;
    }
    const newPost: Item = {
      id: Date.now(),
      content: newPostContent,
      comments: [],
      likeNum: 0,
      readNum: 0,
      collectNum: 0,
      collectStatus: false,
      likeStatus: false,
      createTime: Date(),
    };
    const res = await publishPost({
      content: newPostContent,
      tagIds: [1, 2],
    });
    if (res.code != "00000") {
      console.log("发布失败");
      return;
    }
    this.setState({
      posts: [newPost, ...posts],
      newPostContent: "",
    });
  };
  /**
   * @description 点赞及取消点赞
   * @param postId 帖子id
   */
  handleLikePost = async (postId: number, likeStatus: boolean) => {
    switch (likeStatus) {
      case true: {
        //取消
        const res = await cancelLikePost(postId);
        if (res.code != "00000") {
          console.log("取消点赞失败");
          return;
        }
      }
      case false: {
        //点赞
        const res = await likePost(postId);
        if (res.code != "00000") {
          console.log("点赞失败");
          return;
        }
      }
    }
    const { posts } = this.state;
    const newPosts = posts.map((post) =>
      post.id === postId ? ((post.likeStatus = !post.likeStatus), post) : post
    );
    this.setState({
      posts: newPosts,
    });
  };
  /**
   * @description 收藏帖子及取消收藏
   * @param postId 帖子id
   * @param collected 是否已收藏
   */
  handleCollectPost = (postId: number, collected: boolean) => {
    const { posts, collectedPosts } = this.state;
    if (collected) {
      // 取消收藏
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, collected: false } : post
      );
      // 从收藏列表中删除
      this.setState({
        posts: updatedPosts,
        collectedPosts: collectedPosts.filter((id) => id !== postId),
      });
    } else {
      // 收藏
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, collected: true } : post
      );
      // 添加到收藏列表
      this.setState({
        posts: updatedPosts,
        collectedPosts: [...collectedPosts, postId],
      });
    }
  };

  handleDeletePost = async (postId: number) => {
    const { posts } = this.state;
    const res = await deletePost(postId);
    if (res.code != "00000") {
      console.log("删除失败");
      return;
    }
    const updatedPosts = posts.filter((post) => post.id !== postId);
    this.setState({
      posts: updatedPosts,
    });
  };

  render() {
    const { posts, newPostContent } = this.state;

    return (
      <View className="forum">
        <View className="new-post">
          <Input
            value={newPostContent}
            onInput={this.handleNewPostChange}
            placeholder="发布新帖子"
          />
          <Button onClick={this.handleNewPostSubmit}>发布</Button>
        </View>
        <View className="posts">
          {posts.map((post) => (
            <View className="post" key={post.id}>
              <Text className="post-content">{post.content}</Text>
              <View className="interaction-buttons">
                <Button
                  onClick={() => this.handleLikePost(post.id, post.likeStatus)}
                  className="interaction-button like-button"
                >
                  {post.likeStatus ? "取消赞" : "赞"}
                  {post.likeNum}
                </Button>
                <Button
                  className="interaction-button collect-button"
                  onClick={() =>
                    this.handleCollectPost(post.id, post.collectStatus)
                  }
                >
                  {post.collectStatus ? "已收藏" : "收藏"}
                  {post.collectNum}
                </Button>
                <Button
                  type="primary"
                  className="interaction-button collect-button"
                  onClick={() =>
                    this.handleCollectPost(post.id, post.collectStatus)
                  }
                >
                  评论
                </Button>
                <Button
                  type="primary"
                  className="interaction-button collect-button"
                  onClick={() => this.handleDeletePost(post.id)}
                >
                  删除
                </Button>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Forum;
