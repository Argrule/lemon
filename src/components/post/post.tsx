import { AtAvatar } from "taro-ui";
import { View, Text, Button } from "@tarojs/components";
import { AtTag } from "taro-ui";
import { Item } from "$/pages/forum/data";
import "./post.scss";

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
  return (
    <View className="post" key={post.id}>
      {/* 头像/作者，预留位置 */}
      <View className="post-author">
        <AtAvatar
          size="small"
          image="https://images.infogame.cn/uploads/20220702/img_62bfa8858e30c36.gif"
        ></AtAvatar>
        <Text>猫猫可爱捏</Text>
      </View>
      {/* 帖子内容 */}
      <Text className="post-content">{post.content}</Text>
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
        <Button
          onClick={() => onLike(post.id, post.likeStatus)}
          className="interaction-button like-button"
        >
          {post.likeStatus ? "取消赞" : "赞"}
          {post.likeNum}
        </Button>
        <Button
          className="interaction-button collect-button"
          onClick={() => onCollect(post.id, post.collectStatus)}
        >
          {post.collectStatus ? "已收藏" : "收藏"}
          {post.collectNum}
        </Button>
        {/* <Button
          type="primary"
          className="interaction-button collect-button"
          onClick={() => onCollect(post.id, post.collectStatus)}
        >
          评论
        </Button> */}
        <Button
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
