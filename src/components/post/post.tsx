import { AtAvatar } from "taro-ui";
import { View, Text, Button, Image } from "@tarojs/components";
import { AtTag } from "taro-ui";
import { Item } from "$/pages/forum/data";
import "./post.scss";
import { FormatTimeFromNow } from "$/utils/dayjs";
import lenmon_regular from "../../assets/post/lemonR.svg";
import lenmon_solid from "../../assets/post/lemonS.svg";
import star_regular from "../../assets/post/starR.svg";
import star_solid from "../../assets/post/starS.svg";

interface PostComponentProps {
  post: Item;
  onLike: (postId: number, likeStatus: boolean) => void;
  onCollect: (postId: number, collectStatus: boolean) => void;
  onDelete: (postId: number) => void;
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
  onDelete,
}) => {
  // 待判断
  const handleShowComments = (post) => {
    console.log(post);
  };
  return (
    <View className="post" key={post.id}>
      {/* 头像/作者，预留位置 */}
      <View className="post-author">
        <AtAvatar
          size="normal"
          image="https://images.infogame.cn/uploads/20220702/img_62bfa8858e30c36.gif"
        ></AtAvatar>
        <Text>{post.nickname}</Text>
      </View>
      {/* 帖子内容 */}
      <View className="text-ellipsis">
        <Text
          className="text-ellipsis post-content"
          userSelect
          numberOfLines={3}
        >
          {post.content}
        </Text>
      </View>
      {/* 帖子图片 */}
      <View className="flex" onClick={() => handleShowComments(post)}>
        {post.images?.map((image) => (
          <Image
            src={image}
            style="width: 100px;height: 100px;background: #fff;"
          />
        ))}
      </View>
      {/* 帖子标签 */}
      <View className="post-tags">
        {post.tagName?.map((tag) => (
          <AtTag size="small" className="tagList" circle key={tag}>
            {tag}
          </AtTag>
        ))}
      </View>
      {/* 交互按钮 */}
      <View className="interaction-buttons">
        <Text className="post-time">{FormatTimeFromNow(post.createTime)}</Text>
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
        <Button
          style={"display:none"}
          type="primary"
          className="interaction-button collect-button"
          onClick={() => onDelete(post.id)}
        >
          删除
        </Button>
      </View>
    </View>
  );
};

export default PostComponent;
