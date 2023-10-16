import { AtAvatar } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
// import { Button} from "@tarojs/components";
import { AtTag } from "taro-ui";
import { Item } from "$/pages/forum/data";
import "./post.scss";
import { FormatTimeFromNow } from "$/utils/dayjs";
import lenmon_regular from "../../assets/post/lemonR.svg";
import lenmon_solid from "../../assets/post/lemonS.svg";
import star_regular from "../../assets/post/starR.svg";
import star_solid from "../../assets/post/starS.svg";
import dollar_sign from "../../assets/post/dollarSign.svg";
import { AtFloatLayout } from "taro-ui";
import { AtInputNumber } from "taro-ui";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { rewardPost } from "$/api/forum";

interface PostComponentProps {
  post: Item;
  onLike: (postId: number, likeStatus: boolean) => void;
  onCollect: (postId: number, collectStatus: boolean) => void;
  onDelete?: (postId: number) => void;
  onReward?: (postId: number) => void;
  onShowComments: (postItem: Item) => void;
}
type FunctionComponent<P = {}> = React.FunctionComponent<P>;

/**
 * @description 帖子组件
 * @param post 帖子
 * @param onLike 点赞函数
 * @param onCollect 收藏函数
 * @param onDelete 删除函数
 */
const PostComponent: FunctionComponent<PostComponentProps> = ({
  post,
  onLike,
  onCollect,
  onShowComments,
  onReward,
  // onDelete,
}) => {
  // 打赏弹窗开关
  const [isOpened, setIsOpened] = useState(false);
  const [amount, setAmount] = useState(1);
  /**
   * @description 打赏函数
   * @param postId 帖子id
   * @override onReward
   * @todo 打赏功能, 使用页面过多, 如果全靠函数传进来冗余很多
   */
  onReward = async () => {
    console.log("打赏", amount, post.id);
    //校验
    if (amount < 1) {
      // @ts-ignore
      Taro.atMessage({
        message: "打赏金额不能小于1",
        type: "error",
        duration: 800,
      });
      return;
    }
    //请求
    const res = await rewardPost({ postId: post.id, amount: amount });
    if (res.code != "00000") {
      // @ts-ignore
      Taro.atMessage({
        message: "打赏失败",
        type: "error",
        duration: 800,
      });
      return;
    }
    // @ts-ignore
    Taro.atMessage({
      message: "打赏成功",
      type: "success",
      duration: 800,
    });
  };
  // 打赏弹窗开
  const handleOpen = () => {
    setIsOpened(true);
    console.log("打开");
  };
  // 打赏弹窗关
  const handleClose = () => {
    setIsOpened(false);
    console.log("关闭");
  };
  return (
    <View className="post" key={post.id}>
      {/* 头像/作者，预留位置 */}
      <View className="post-author">
        <AtAvatar size="normal" circle image={post.avatarUrl}></AtAvatar>
        <Text className="post-author-name">{post.nickname}</Text>
      </View>
      {/* 帖子内容 */}
      <View className="text-ellipsis post-main">
        <Text
          className="text-ellipsis post-content"
          userSelect
          numberOfLines={3}
          onClick={() => onShowComments(post)}
        >
          {post.content}
        </Text>
      </View>
      {/* 帖子图片 */}
      <View className="flex post-main" onClick={() => onShowComments(post)}>
        {post.images?.map((image) => (
          <Image
            src={image}
            style="width: 80px;height: 80px;background: #fff;"
          />
        ))}
      </View>
      {/* 帖子标签 */}
      <View className="post-tags post-main">
        {post.tagName?.map((tag) => (
          <AtTag size="small" className="tagList" circle key={tag}>
            {tag}
          </AtTag>
        ))}
      </View>
      {/* 打赏操作浮动弹层，每个都加弹层会多很多不必要的dom */}
      <AtFloatLayout
        isOpened={isOpened}
        // title="这是个标题"
        onClose={handleClose}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "4em",
          }}
        >
          <View>打赏金额</View>
          <AtInputNumber
            type="digit"
            min={0}
            max={100}
            step={1}
            value={amount}
            onChange={setAmount}
          />
          <View
            onClick={onReward as () => void}
            style={{
              lineHeight: "2em",
              backgroundColor: "#fe3666",
              color: "#fff",
              textAlign: "center",
              width: "30%",
              borderRadius: "1em",
            }}
          >
            打赏
          </View>
        </View>
      </AtFloatLayout>
      {/* 交互按钮 */}
      <View className="interaction-buttons">
        <Text className="post-time post-main">
          {FormatTimeFromNow(post.createTime)}
        </Text>
        <View
          onClick={() => onLike(post.id, post.likeStatus)}
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
          {/* {post.likeStatus ? "取消赞" : "赞"} */}
          {post.likeNum}
        </View>
        <View
          className="interaction-button collect-button"
          onClick={() => onCollect(post.id, post.collectStatus)}
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
          {/* {post.collectStatus ? "已收藏" : "收藏"} */}
          {post.collectNum}
        </View>
        <View
          className="interaction-button collect-button"
          onClick={handleOpen}
        >
          <Image
            src={dollar_sign}
            mode="scaleToFill"
            style="width: 20px; height: 20px;"
          ></Image>
        </View>
        {/* <Button
          style={"display:none"}
          type="primary"
          className="interaction-button collect-button"
          onClick={() => onDelete(post.id)}
        >
          删除
        </Button> */}
      </View>
    </View>
  );
};

export default PostComponent;
