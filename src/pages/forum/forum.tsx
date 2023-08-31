import { Component } from "react";
import { View, Text, Button, BaseEventOrig } from "@tarojs/components";
// import { Input } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import "./forum.scss";
import { InputEventDetail } from "taro-ui/types/input";
import {
  deletePost,
  getForumList,
  publishPost,
  likePost,
  cancelLikePost,
  collectPost,
  cancelCollectPost,
} from "$/api/forum";
import { Item, State } from "./data";

class Forum extends Component<{}, State> {
  /* 状态 */
  state: State = {
    posts: [], // 帖子列表
    newPostContent: "", // 新帖子内容
  };
  /* 非生命周期，onShow */
  async componentDidShow() {
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
    // ## 假冒的帖子
    const newMockPost: Item = {
      id: Date.now(),
      uid: 1,
      schoolId: 1,
      content: newPostContent,
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
      posts: [newMockPost, ...posts],
      newPostContent: "",
    });
  };
  /**
   * @description 点赞及取消点赞
   * @param postId 帖子id
   */
  handleLikePost = async (postId: number, likeStatus: boolean) => {
    let addNum = 0;
    switch (likeStatus) {
      case true: {
        //取消
        const res = await cancelLikePost(postId);
        addNum = -1;
        if (res.code != "00000") {
          console.log("取消点赞失败");
          return;
        }
        break;
      }
      case false: {
        //点赞
        const res = await likePost(postId);
        addNum = 1;
        if (res.code != "00000") {
          console.log("点赞失败");
          return;
        }
        break;
      }
    }
    const { posts } = this.state;
    const newPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likeStatus: !post.likeStatus,
            likeNum: post.likeNum + addNum,
          }
        : post
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
  handleCollectPost = async (postId: number, collectStatus: boolean) => {
    // let successMessage = "";
    let errorMessage = "";
    let addNum = 0;
    let res: any = null;
    if (collectStatus) {
      res = await cancelCollectPost(postId);
      // successMessage = "取消收藏成功";
      errorMessage = "取消收藏失败";
      addNum = -1;
    } else {
      res = await collectPost(postId);
      // successMessage = "收藏成功";
      errorMessage = "收藏失败";
      addNum = 1;
    }

    if (res.code !== "00000") {
      console.log(errorMessage);
      return;
    }

    const { posts } = this.state;
    const newPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            collectStatus: !post.collectStatus,
            collectNum: post.collectNum + addNum,
          }
        : post
    );

    this.setState({
      posts: newPosts,
    });
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
  /**
   * @description 展示评论
   * @param postId 帖子id
   */
  handleShowComments = async (postItem: Item) => {
    // redux存储当前帖子，跳转到评论页面
    Taro.navigateTo({
      url: `/pages/comment/c?post=${JSON.stringify(postItem)}`,
    });
  };
  //跳转到发布帖子页面
  goToPutPost = () => {
    Taro.navigateTo({
      url: "/pages/sendPost/sp",
    });
  };
  render() {
    const { posts } = this.state;
    // const { newPostContent } = this.state;
    return (
      <View className="forum">
        <AtIcon
          className="plus"
          value="add-circle"
          size="40"
          color="#f4ea2a"
          onClick={this.goToPutPost}
        ></AtIcon>
        {/* <View className="new-post">
          <Input
            value={newPostContent}
            onInput={this.handleNewPostChange}
            placeholder="发布新帖子"
          />
          <Button onClick={this.handleNewPostSubmit}>发布</Button>
        </View> */}
        <View className="posts">
          {posts.map((post) => (
            <>
              <View className="post" key={post.id}>
                <Text className="post-content">{post.content}</Text>
                <View className="post-tags">
                  {post.tagName?.map((tag) => (
                    <AtTag size="small" className="tagList" circle>
                      {tag}
                    </AtTag>
                  ))}
                </View>
                <View className="interaction-buttons">
                  <Button
                    onClick={() =>
                      this.handleLikePost(post.id, post.likeStatus)
                    }
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
                    onClick={() => this.handleShowComments(post)}
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
              {/* <Button
                type="primary"
                className="interaction-button comment-button"
                onClick={() => this.handleShowComments(post)}
              >
                查看评论
              </Button> */}
            </>
          ))}
        </View>
      </View>
    );
  }
}

export default Forum;
