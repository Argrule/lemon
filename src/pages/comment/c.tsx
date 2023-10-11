import { View, Text, Button, Input } from "@tarojs/components";
import { Textarea } from "@tarojs/components";
// import { useDidShow } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { getComment, publishComment, replyComment } from "$/api/forum";
import Taro, { useDidShow } from "@tarojs/taro";
// import { getCurrentInstance } from "@tarojs/taro";
import { AtMessage } from "taro-ui";
import { AtAvatar } from "taro-ui";
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
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
import { FormatTimeFromNow } from "$/utils/dayjs";
import { useSelector } from 'react-redux'

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
    nickname: "",
  });

  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [newReplyContent, setNewReplyContent] = useState<string>("");
  const CommentIdMark = useRef<number>(0);

  const [isInputDialogOpen, setIsInputDialogOpen] = useState<boolean>(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] =
    useState<boolean>(false);
  const [placeholderStr, setPlaceholderStr] = useState("发布新评论");
  const [replyToPerson, setReplyToPerson] = useState<string>("");

  // 更好的获取post的方式，redux 替代 url传参
  const betterPost = useSelector((state:{postInfo:Item})=>state.postInfo);
  useDidShow(async () => {
    // const instance = getCurrentInstance();
    // console.log('show get post==>',((instance as any).router.params.post));
    // setPost(JSON.parse((instance as any).router.params.post) as Item);
    
    console.log('show get post==>',betterPost);
    setPost(betterPost);
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
    // 关闭输入弹窗
    setIsCommentDialogOpen(false);

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
  const handleNewReplySubmit = async () => {
    if (!newReplyContent) {
      console.log("请输入回复内容");
      //@ts-ignore
      Taro.atMessage({
        message: "请输入回复内容",
        type: "error",
        duration: 800,
      });
      return;
    }
    const res = await replyComment({
      commentId: CommentIdMark.current,
      content: newReplyContent,
    });
    if (res.code != "00000") {
      console.log("回复失败");
      return;
    }
    setNewReplyContent("");

    // 直接重新获取评论列表,没错就是评论列表，不是回复列表
    const res2 = await getComment(post.id);
    if (res2.code != "00000") {
      console.log("展示评论失败");
      return;
    }
    setCommentsList(res2.data.list);
    // 关闭输入弹窗
    setIsInputDialogOpen(false);
  };

  const handleInputBlur = (nickname: string, id?: number) => {
    scrollToBottom();
    // 打开输入框
    switch (id) {
      case undefined:
        // ## 还没拿到 用户名
        setPlaceholderStr("回复 @某人哦~");
        setReplyToPerson(nickname);
        setIsCommentDialogOpen(true);
        break;

      default:
        setPlaceholderStr("发送你的回复哦~");
        CommentIdMark.current = id;
        setReplyToPerson(nickname);
        setIsInputDialogOpen(true);
        break;
    }
  };
  function scrollToBottom() {
    // 获取页面高度
    Taro.createSelectorQuery()
      .selectViewport()
      .scrollOffset((res) => {
        const scrollTop = res.scrollTop;
        console.log(scrollTop);
        // 设置滚动位置为页面底部
        Taro.pageScrollTo({
          scrollTop: 100000, // 10000 是一个足够大的值，确保能滚动到页面底部
          duration: 300, // 滚动持续时间
        });
      })
      .exec();
  }
  // useEffect(() => {
  //   if (isInputDialogOpen) {
  //     // @ts-ignore
  //     inputRef.current.focus();
  //   }
  // }, [isInputDialogOpen]);

  return (
    <View>
      {/* 顶部消息提示 */}
      <AtMessage />
      {/* 指示器 用于输入回复 */}
      <AtActionSheet
        isOpened={isInputDialogOpen}
        className="input-container"
        onClose={() => setIsInputDialogOpen(false)}
      >
        <Textarea
          value={newReplyContent}
          maxlength={200}
          placeholder={`回复 @${replyToPerson}`}
          className="textarea"
          onInput={(e) => setNewReplyContent((e.target as any).value)}
          style="min-height:200rpx"
          cursor-spacing={150}
          show-confirm-bar={false}
          autoHeight
        />
        <AtActionSheetItem>
          <View className="rely-main">
            {/* <Input
              className="rely-input"
              // ref={inputRef}
              value={newCommentContent}
              onInput={handleNewCommentChange}
              placeholder={placeholderStr}
            /> */}
            <Button
              className="rely-btn"
              onClick={() => setIsInputDialogOpen(false)}
            >
              预留其他功能
            </Button>
            <Button className="rely-btn" onClick={handleNewReplySubmit}>
              回复
            </Button>
          </View>
        </AtActionSheetItem>
      </AtActionSheet>
      {/* 用于输入评论 */}
      <AtActionSheet
        isOpened={isCommentDialogOpen}
        className="input-container"
        onClose={() => setIsCommentDialogOpen(false)}
      >
        <Textarea
          value={newCommentContent}
          maxlength={200}
          placeholder={`回复 @${replyToPerson}`}
          className="textarea"
          onInput={handleNewCommentChange}
          style="min-height:200rpx"
          cursor-spacing={150}
          show-confirm-bar={false}
          autoHeight
        />
        <AtActionSheetItem>
          <View className="rely-main">
            <Button
              className="rely-btn"
              onClick={() => setIsCommentDialogOpen(false)}
            >
              预留其他功能
            </Button>
            <Button className="rely-btn" onClick={handleNewCommentSubmit}>
              发布评论
            </Button>
          </View>
        </AtActionSheetItem>
      </AtActionSheet>
      {/* 帖子 */}
      <PostComponent
        post={post}
        onLike={handleLikePost}
        onDelete={handleDeletePost}
        onCollect={handleCollectPost}
        onShowComments={() => {}}
      />
      <View style={"color:#a0aa25;margin-left:15rpx;"}>共{commentsList.length}条评论</View>
      {/* 评论展示区域 */}
      <View className="comments">
        {commentsList.map((comment) => (
          <View className="comment" key={comment.id}>
            <View className="author">
              <AtAvatar size="normal" image={comment.avatarUrl}></AtAvatar>
              <Text>{comment.nickname}</Text>
            </View>
            {/* 评论内容 */}
            <View className="comment-content">
              <Text userSelect>{comment.content}</Text>
            </View>
            {/* 评论更多功能 */}
            <View>
              <Text className="comment-time">
                {FormatTimeFromNow(comment.createTime)}
              </Text>
              <Text
                className="comment-reply"
                onClick={() => handleInputBlur(comment.nickname, comment.id)}
              >
                回复
              </Text>
            </View>
            {/* 回复评论 */}
            <View className="reply">
              {comment.replyList.map((reply) => (
                <View className="reply-item" key={reply.uid}>
                  <View className="author">
                    <AtAvatar
                      size="small"
                      className="custom-avatar"
                      image={reply.avatarUrl}
                    ></AtAvatar>
                    <Text>{reply.nickname}</Text>
                    <Text className="comment-time">
                      {FormatTimeFromNow(reply.createTime)}
                    </Text>
                  </View>
                  <View className="reply-content">
                    <Text userSelect>{reply.content}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
      {/* 评论输入区域 */}
      <View className="new-post">
        <Input
          value={newCommentContent}
          disabled
          onClick={() => handleInputBlur(post.nickname)}
          onInput={handleNewCommentChange}
          placeholder={placeholderStr}
        />
        <Button onClick={handleNewCommentSubmit}>发布</Button>
      </View>
    </View>
  );
}
