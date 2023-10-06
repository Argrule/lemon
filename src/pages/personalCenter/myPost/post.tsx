import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtTag } from "taro-ui";
import { AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
// import "./forum.scss";
import "./post.scss";
import {
  deletePost,
  getMyForumList,
  likePost,
  cancelLikePost,
  collectPost,
  cancelCollectPost,
} from "$/api/forum";
import { Item } from "../../forum/data";
import { FormatTimeFromNow } from "$/utils/dayjs";
import lenmon_regular from "$/assets/post/lemonR.svg";
import lenmon_solid from "$/assets/post/lemonS.svg";
import star_regular from "$/assets/post/starR.svg";
import star_solid from "$/assets/post/starS.svg";
import trash_icon from "$/assets/post/trash.svg";
import { connect } from "react-redux";
import { updatePost } from "../../../store/use/post";
import DevelopingCom from "../../developing/developing";
interface State {
  posts: Item[];
}
// @ts-ignore
@connect(
  ({ postInfo }: { postInfo: Item }) => ({
    postInfo,
  }),
  (dispatch) => ({
    updatePostStore(postInfo: Item) {
      dispatch(updatePost(postInfo));
    },
  })
)
class MyPost extends Component<{}, State> {
  /* 状态 */
  state: State = {
    posts: [], // 帖子列表
  };

  pageNum = 1;
  pageSize = 10;

  /* 非生命周期，onShow */
  async componentDidShow() {
    const res = (await getMyForumList({
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
    const res = (await getMyForumList({
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
    Taro.showModal({
      title: "提示",
      content: "请确认是否删除",
      success: async (res1) => {
        if (res1.confirm) {
          console.log("用户点击确定");
          const res = await deletePost(postId);
          if (res.code != "00000") {
            // @ts-ignore
            Taro.atMessage({
              message: "删除失败",
              type: "error",
              duration: 800,
            });
            return;
          }
          const updatedPosts = posts.filter((post) => post.id !== postId);
          this.setState({
            posts: updatedPosts,
          });
        } else if (res1.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  /**
   * @description 展示评论
   * @param postId 帖子id
   */
  handleShowComments = async (postItem: Item) => {
    // redux存储当前帖子，跳转到评论页面
    // @ts-ignore
    this.props.updatePostStore(postItem);
    Taro.navigateTo({
      url: `/pages/comment/c`,
    });
  };

  render() {
    const { posts } = this.state;
    return (
      <View
        className="forum"
        style={{
          minHeight: "100vh",
        }}
      >
        <AtMessage />
        {posts.length === 0 ? (
          <DevelopingCom content="暂无帖子" />
        ) : (
          <View className="my-posts">
            {posts.map((post) => (
              <>
                <View className="post" key={post.id}>
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
                        style="width: 80px;height: 80px;background: #fff;"
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
                    <View
                      onClick={() =>
                        this.handleLikePost(post.id, post.likeStatus)
                      }
                      className="interaction-button like-button"
                    >
                      {post.likeStatus ? (
                        <Image
                          src={lenmon_solid}
                          mode="scaleToFill"
                          style="width: 20px; height: 20px;"
                        ></Image>
                      ) : (
                        <Image
                          src={lenmon_regular}
                          mode="scaleToFill"
                          style="width: 20px; height: 20px;"
                        ></Image>
                      )}
                      {post.likeNum}
                    </View>
                    <View
                      className="interaction-button collect-button"
                      onClick={() =>
                        this.handleCollectPost(post.id, post.collectStatus)
                      }
                    >
                      {post.collectStatus ? (
                        <Image
                          src={star_solid}
                          mode="scaleToFill"
                          style="width: 20px; height: 20px;"
                        ></Image>
                      ) : (
                        <Image
                          src={star_regular}
                          mode="scaleToFill"
                          style="width: 20px; height: 20px;"
                        ></Image>
                      )}
                      {post.collectNum}
                    </View>

                    <View
                      className="interaction-button collect-button"
                      onClick={() => this.handleDeletePost(post.id)}
                    >
                      <Image
                        src={trash_icon}
                        mode="scaleToFill"
                        style="width: 20px; height: 20px;"
                      ></Image>
                    </View>
                  </View>
                </View>
              </>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default MyPost;
