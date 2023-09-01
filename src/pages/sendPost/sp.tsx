import { useState } from "react";
import { View, Button, ScrollView } from "@tarojs/components";
import { Textarea } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import { AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import { publishPost } from "$/api/forum";
import { Tag } from "../forum/data";
import "./sp.scss";

function CommentInput() {
  // { onPublish }
  const [commentText, setCommentText] = useState("");
  const [tagList, setTagList] = useState<Tag[]>([
    {
      id: 1,
      name: "hello",
    },
    {
      id: 2,
      name: "hllo",
    },
    {
      id: 3,
      name: "helo",
    },
    {
      id: 4,
      name: "ello",
    },
    {
      id: 5,
      name: "ello",
    },
    {
      id: 6,
      name: "ello",
    },
    {
      id: 7,
      name: "ello",
    },
    {
      id: 9,
      name: "ello",
    },
    {
      id: 8,
      name: "ello",
    },
    {
      id: 10,
      name: "ello",
    },
    {
      id: 101,
      name: "ello",
    },
    {
      id: 11,
      name: "ello",
    },
  ]);

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
    <View className="post-new">
      {/* <Input
        className="input-box"
        value={commentText}
        onInput={(e) => setCommentText(e.detail.value)}
        placeholder="请输入评论内容"
      /> */}
      <ScrollView scrollX className="scroll-container">
        {tagList.map((tag) => (
          <AtTag size="small" key={tag.id} className="tag-item">
            {tag.name}
          </AtTag>
        ))}
      </ScrollView>
      <Textarea
        value={commentText}
        maxlength={200}
        placeholder="请输入帖子内容..."
        className="textarea"
        onInput={(e) => setCommentText(e.detail.value)}
        style="min-height:200rpx"
        autoHeight
      />
      <AtMessage />
      {/* <AtTextarea
        className="textarea"
        count={true}
        value={commentText}
        height={200}
        onChange={(value) => setCommentText(value)}
        maxLength={200}
        placeholder="请输入帖子内容..."
      /> */}
      <Button className="publish-button" onClick={handlePublish}>
        发布
      </Button>
    </View>
  );
}

export default CommentInput;
