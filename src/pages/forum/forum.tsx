import { Component } from "react";
import { View, Text, Button, Input, BaseEventOrig } from "@tarojs/components";
import "./forum.scss";
import { InputEventDetail } from "taro-ui/types/input";
import { getForumList, publishPost } from "$/api/forum";
import { Item, Post, State } from "./data";

class Forum extends Component<{}, State> {
  state: State = {
    posts: [], // 帖子列表
    newPostContent: "", // 新帖子内容
    likedPosts: [], // 已点赞的帖子id列表
    collectedPosts: [], // 已收藏的帖子id列表
  };
  async componentDidMount() {
    const res = (await getForumList({
      pageNum: 1,
      pageSize: 10,
    })) as { list: Item[] };
    console.log(res);
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
    const newPost: Post = {
      id: Date.now(),
      content: newPostContent,
      comments: [],
      likes: 0,
      collected: false,
    };
    const res = await publishPost({
      content: newPostContent,
      tagIds: [1, 2],
    });
    console.log(res);
    this.setState({
      posts: [newPost, ...posts],
      newPostContent: "",
    });
  };
  /**
   * @description 点赞及取消点赞
   * @param postId 帖子id
   */
  handleLikePost = (postId: number) => {
    const { posts, likedPosts } = this.state;
    let updatedPosts: Post[] = [];
    if (likedPosts.includes(postId)) {
      updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      );
      this.setState({
        posts: updatedPosts,
        likedPosts: likedPosts.filter((id) => id !== postId),
      });
    } else {
      updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      this.setState({
        posts: updatedPosts,
        likedPosts: [...likedPosts, postId],
      });
    }
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

  render() {
    const { posts, newPostContent, likedPosts } = this.state;

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
                  onClick={() => this.handleLikePost(post.id)}
                  className="interaction-button like-button"
                >
                  {likedPosts.includes(post.id) ? "取消赞" : "赞"}
                  {post.likes}
                </Button>
                <Button
                  className="interaction-button collect-button"
                  onClick={() =>
                    this.handleCollectPost(post.id, post.collected)
                  }
                >
                  {post.collected ? "已收藏" : "收藏"}
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
