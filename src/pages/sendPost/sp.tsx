import { useState } from "react";
import { View, Button } from "@tarojs/components";
// import { Input,Textarea } from "@tarojs/components";
import { AtTextarea, AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import { publishPost } from "$/api/forum";

import "./sp.scss";

function CommentInput() {
  // { onPublish }
  const [commentText, setCommentText] = useState("");

  const handlePublish = async () => {
    if (commentText.trim() == "") {
      // @ts-ignore Taro缺少atMessage声明，忽略报错
      Taro.atMessage({
        message: "请输入内容",
        type: "error",
        duration: 800,
      });
      return;
    }
    const res = await publishPost({
      content: commentText,
      tagIds: [1, 2],
    });
    if (res.code != "00000") {
      //@ts-ignore
      Taro.atMessage({
        message: "发布失败",
        type: "error",
        duration: 800,
      });
      return;
    }
    Taro.switchTab({ url: "/pages/forum/forum" });
    // onPublish(commentText);
    setCommentText("");
  };

  return (
    <View className="comment-input">
      {/* <Input
        className="input-box"
        value={commentText}
        onInput={(e) => setCommentText(e.detail.value)}
        placeholder="请输入评论内容"
      /> */}
      {/* <Textarea style='background:#fff;width:100%;min-height:80px;padding:0 30rpx;' autoHeight/> */}
      <AtMessage />
      <AtTextarea
        className="textarea"
        count={true}
        value={commentText}
        height={200}
        onChange={(value) => setCommentText(value)}
        maxLength={200}
        placeholder="请输入帖子内容..."
      />
      <Button className="publish-button" onClick={handlePublish}>
        发布
      </Button>
    </View>
  );
}

export default CommentInput;
