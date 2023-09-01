import { View, Text, Button, Input } from "@tarojs/components";
// import { useDidShow } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { getComment, publishComment } from "$/api/forum";
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { AtMessage } from "taro-ui";
// import { AtTag } from "taro-ui";
import { Item, Comment } from "../forum/data";
import {
  deletePost,
  likePost,
  cancelLikePost,
  collectPost,
  cancelCollectPost,
} from "$/api/forum";
import PostComponent from "$/components/post/post";
import "./c.scss";

export default function CommentDetail() {
  const [post, setPost] = useState<Item>({
    id: 0, //伪造测试数据
    uid: 0,
    schoolId: 0,
    content: "",
    readNum: 0,
    likeNum: 0,
    collectNum: 0,
    likeStatus: false,
    collectStatus: false,
    createTime: "",
  });

  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState<string>("");

  const inputRef = useRef(null);
  const [placeholderStr, setPlaceholderStr] = useState("发布新评论");

  useDidShow(async () => {
    const instance = getCurrentInstance();
    setPost(JSON.parse((instance as any).router.params.post) as Item);
  });
  useEffect(() => {
    (async () => {
      const res = await getComment(post.id);
      if (res.code != "00000") {
        console.log("展示评论失败");
        return;
      }
      // console.log(res.data);
      setCommentsList(res.data.list);
    })();
  }, [post.id]);
  // useEffect(() => {
  //   (async () => {
  //     console.log("comment did show");
  //     const instance = getCurrentInstance();
  //     setPost(JSON.parse((instance as any).router.params.post) as Item);
  //     // post = JSON.parse((instance as any).router.params.post) as Item;
  //   })();
  // }, []);
  // useEffect(() => {
  //   // console.log(post.current);
  //   // 获取评论列表
  //   (async () => {
  //     const res = await getComment(post.id);
  //     if (res.code != "00000") {
  //       console.log("展示评论失败");
  //       return;
  //     }
  //     // console.log(res.data);
  //     setCommentsList(res.data.list);
  //   })();
  // }, [post.id]);

  /**
   * @description 点赞及取消点赞
   * @param postId 帖子id
   */
  const handleLikePost = async (postId: number, likeStatus: boolean) => {
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
    const newPost = {
      ...post,
      likeStatus: !post.likeStatus,
      likeNum: post.likeNum + addNum,
    };
    //触发重新渲染
    setPost(newPost);
  };
  /**
   * @description 收藏帖子及取消收藏
   * @param postId 帖子id
   * @param collected 是否已收藏
   */
  const handleCollectPost = async (postId: number, collectStatus: boolean) => {
    let errorMessage = "";
    let addNum = 0;
    let res: any = null;
    if (collectStatus) {
      res = await cancelCollectPost(postId);
      errorMessage = "取消收藏失败";
      addNum = -1;
    } else {
      res = await collectPost(postId);
      errorMessage = "收藏失败";
      addNum = 1;
    }

    if (res.code !== "00000") {
      console.log(errorMessage);
      return;
    }

    const newPost = {
      ...post,
      collectStatus: !post.collectStatus,
      collectNum: post.collectNum + addNum,
    };
    //触发重新渲染
    setPost(newPost);
  };

  const handleDeletePost = async (postId: number) => {
    const res = await deletePost(postId);
    if (res.code != "00000") {
      console.log("删除失败");
      return;
    }
    Taro.navigateBack({ delta: 1 });
  };

  const handleNewCommentChange = (e: any) => {
    setNewCommentContent(e.target.value);
  };
  const handleNewCommentSubmit = async () => {
    if (!newCommentContent) {
      console.log("请输入评论内容");
      //@ts-ignore
      Taro.atMessage({
        message: "请输入评论内容",
        type: "error",
        duration: 800,
      });
      return;
    }
    const res = await publishComment({
      postId: post.id,
      content: newCommentContent,
    });
    if (res.code != "00000") {
      console.log("发布评论失败");
      return;
    }
    setNewCommentContent("");

    // 直接重新获取评论列表
    const res2 = await getComment(post.id);
    if (res2.code != "00000") {
      console.log("展示评论失败");
      return;
    }
    setCommentsList(res2.data.list);

    //不触发全部重新获取,需要后端返回新评论的数据
    // post.current = post.current;
    // const newComment: Comment = {
    //   id: 0,
    //   uid: 0,
    //   postId: 0,
    //   content: newCommentContent,
    //   createTime: "",
    // };
    // setCommentsList([newComment, ...commentsList]);
  };
  const handleInputBlur = () => {
    console.log("blur");
    setPlaceholderStr("发送你的回复哦~");
    /**
     * 这个方案不太对啊，切换输入的内容万一不想发回复，又想发新评论怎么办
     */
    (inputRef.current as any).focus();
  };

  return (
    <View>
      <AtMessage />
      {/* 帖子 */}
      <PostComponent
        post={post}
        onLike={handleLikePost}
        onDelete={handleDeletePost}
        onCollect={handleCollectPost}
      />
      <View style={"color:#ffaa00"}>comment</View>
      {/* 评论展示区域 */}
      <View className="comments">
        {commentsList.map((comment) => (
          <View className="comment" key={comment.id}>
            <Text className="comment-content" userSelect>
              {comment.content}
            </Text>
            {/* ###### 暂时注释掉因为太丑了 ###### */}
            {/* <Button className="comment-reply" onClick={handleInputBlur}>
              回复
            </Button> */}
          </View>
        ))}
      </View>
      {/* 评论输入区域 */}
      <View className="new-post">
        <Input
          ref={inputRef}
          value={newCommentContent}
          onInput={handleNewCommentChange}
          placeholder={placeholderStr}
        />
        <Button onClick={handleNewCommentSubmit}>发布</Button>
      </View>
    </View>
  );
}
