import { Component } from "react";
import { View, BaseEventOrig } from "@tarojs/components";
import { Image } from "@tarojs/components";
import search_icon from "../../assets/info/search.png";
import forum_ad from "../../assets/ad/banner.png";
import { AtFab } from "taro-ui";
import { AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import "./forum.scss";
import { InputEventDetail } from "taro-ui/types/input";
import {
  deletePost,
  getForumList,
  // publishPost,
  likePost,
  cancelLikePost,
  collectPost,
  cancelCollectPost,
  searchPost,
  getHotPost,
} from "$/api/forum";
import { Item, State } from "./data";
// import { AtSearchBar } from "taro-ui";
import { HotPost } from "$/components/hotPost/hp";
// import { FormatTimeFromNow } from "$/utils/dayjs";
import PostComponent from "$/components/post/post";
import SpecialDeal from "./special";
import NavCustomBar from "$/components/NavCustomBar/nav";

class Forum extends Component<{}, State> {
  /* 状态 */
  state: State = {
    posts: [], // 帖子列表
    newPostContent: "", // 新帖子内容
    searchContent: "",
    hotPosts: [], // 热搜帖子
  };

  pageNum = 1;
  pageSize = 10;

  /* 非生命周期，onShow */
  async componentDidShow() {
    getHotPost().then((res) => {
      this.setState({ hotPosts: res.data.list.slice(0, 10) });
    });
    const res = (await getForumList({
      pageNum: 1,
      pageSize: 10,
    })) as { list: Item[] };
    this.setState({ posts: res.list });
  }

  /**
   * @description 触底加载更多
   */
  async onReachBottom() {
    console.log("触底了");
    this.pageNum++;
    const { posts } = this.state;
    const res = (await getForumList({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    })) as { list: Item[] };
    if (res.list.length === 0) {
      // @ts-ignore
      Taro.atMessage({
        message: "没有更多了",
        type: "error",
        duration: 800,
      });
      this.pageNum--;
      return;
    }
    this.setState({ posts: [...posts, ...res.list] });
  }
  /**
   * @description 输入框内容变化
   * @param event
   */
  handleNewPostChange = (event: BaseEventOrig<InputEventDetail>) => {
    this.setState({ newPostContent: event.detail.value as string });
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
  // 跳转到搜索页面
  goToSearch = () => {
    Taro.navigateTo({ url: "/pages/search/s" });
  };
  //搜索框内容变化
  handleSearchChange = (value: string) => {
    this.setState({ searchContent: value });
  };
  //搜索
  handleSearch = async () => {
    const { searchContent } = this.state;
    const res = await searchPost({
      pageNum: 1,
      pageSize: 10,
      content: searchContent,
    });
    if (res.code != "00000") {
      // @ts-ignore
      Taro.atMessage({
        message: "搜索失败",
        type: "error",
        duration: 800,
      });
      return;
    }
    this.setState({ posts: res.data.list });
  };
  render() {
    const { posts } = this.state;

    return (
      <>
        {/* 自定义导航栏 */}
        <NavCustomBar mainTitle="论坛" needBackIcon={false} />
        {/* main */}
        <View className="forum">
          <AtMessage
            style={{
              /* @ts-ignore 传入scss变量调整位置 */
              "--traceNavTop": Taro.getStorageSync("nav_bar_height") + "px",
            }}
          />
          {/* 搜索跳转按钮 */}
          {false ? null : (
            <AtFab className="plus" onClick={this.goToSearch}>
              <Image
                src={search_icon}
                svg
                mode="aspectFill"
                style={{ width: "46rpx", height: "46rpx", display: "block" }}
              />
            </AtFab>
          )}
          {/* 废弃搜索框 */}
          {/* <AtSearchBar
            className="search-bar"
            fixed={true}
            value={this.state.searchContent}
            onChange={this.handleSearchChange}
            onConfirm={this.handleSearch}
            onActionClick={this.handleSearch}
          /> */}
          <HotPost hotPosts={this.state.hotPosts}></HotPost>
          {/* 广告 */}
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={forum_ad}
              mode="scaleToFill"
              style={{
                width: "100%",
                height: "97px",
                padding: "8px 8px",
                borderRadius: "34px",
              }}
            />
          </View>
          {/* 帖子列表 */}
          <View className="posts">
            {/* // ### 这里做判断 是防止出现取消发布的数据写回不及时 多出一个空白帖子的bug */}
            {posts.map((post) =>
              SpecialDeal(post) ? null : (
                // {/* 帖子 */}
                <PostComponent
                  post={post}
                  onLike={this.handleLikePost}
                  onDelete={this.handleDeletePost}
                  onCollect={this.handleCollectPost}
                  onShowComments={this.handleShowComments}
                />
              )
            )}
            {/* 旧post布局 */}
            {/* <View className="post" key={post.id}>
                <Text className="post-nick">{post.nickname}</Text>
                <Text
                  className="post-content"
                  userSelect
                  onClick={() => this.handleShowComments(post)}
                >
                  {post.content}
                </Text>
                <View
                  className="flex"
                  onClick={() => this.handleShowComments(post)}
                >
                  {post.images?.map((image) => (
                    <Image
                      src={image}
                      style="width: 100px;height: 100px;background: #fff;"
                    />
                  ))}
                </View>
                <View className="post-tags">
                  {post.tagName?.map((tag) => (
                    <AtTag size="small" className="tagList" circle>
                      {tag}
                    </AtTag>
                  ))}
                </View>
                <View className="interaction-buttons">
                  <Text className="post-time">
                    {FormatTimeFromNow(post.createTime)}
                  </Text>
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
                    style={"display:none"}
                    type="primary"
                    className="interaction-button collect-button"
                    onClick={() => this.handleDeletePost(post.id)}
                  >
                    删除
                  </Button>
                </View>
              </View> */}
          </View>
        </View>
      </>
    );
  }
}

export default Forum;
