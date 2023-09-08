import { useEffect, useState } from "react";
import { View, Button, ScrollView } from "@tarojs/components";
import { Textarea } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import { AtTag } from "taro-ui";
import { AtImagePicker } from "taro-ui";
import Taro, { useDidShow } from "@tarojs/taro";
import { publishPost, getTags, uploadImage } from "$/api/forum";
import { CreateDraftAPI, DeleteDraftAPI } from "$/api/forum";
import { Tag } from "../forum/data";
import "./sp.scss";
import { File } from "taro-ui/types/image-picker";

function CommentInput() {
  const [postId, setPostId] = useState<number>(0);
  const [commentText, setCommentText] = useState("");
  const [tagList, setTagList] = useState<Tag[]>([
    // {
    //   id: 1,
    //   name: "hello",
    // },
    // {
    //   id: 2,
    //   name: "hllo",
    // },
    // {
    //   id: 3,
    //   name: "helo",
    // },
    // {
    //   id: 4,
    //   name: "ello",
    // },
    // {
    //   id: 5,
    //   name: "ello",
    // },
    // {
    //   id: 6,
    //   name: "ello",
    // },
    // {
    //   id: 7,
    //   name: "ello",
    // },
    // {
    //   id: 9,
    //   name: "ello",
    // },
    // {
    //   id: 8,
    //   name: "ello",
    // },
    // {
    //   id: 10,
    //   name: "ello",
    // },
    // {
    //   id: 101,
    //   name: "ello",
    // },
    // {
    //   id: 11,
    //   name: "ello",
    // },
  ]);
  const [tagIds, setTagIds] = useState<number[]>([]);

  const [files, setFiles] = useState<File[]>([
    // const [files, setFiles] = useState<any[]>([
    // {
    //   url: "https://images.infogame.cn/uploads/20220702/img_62bfa8858e30c36.gif",
    // },
  ]);
  const onImageFileChange = (files: File[]) => {
    console.log(files);
    setFiles(files);
    //@ts-ignore
    // Taro.atMessage({
    //   message: "抱歉, 上传图片正在完善...",
    //   type: "warning",
    //   duration: 1500,
    // });
    // console.log("上传图片正在constructing...");
  };

  /**
   * @description 上传图片 #####bug 这是测试
   */

  const handleUpload = async () => {
    deleteDraft();
  };
  /**
   * @description 创建帖子草稿
   */
  const createDraft = async () => {
    console.log("创建帖子草稿");
    const data = await CreateDraftAPI();
    console.log(data);
    setPostId(data);
    Taro.setStorageSync("postId", data);
    Taro.setStorageSync("canCancel", false);
  };
  /**
   * @description 删除帖子草稿
   */
  const deleteDraft = async () => {
    console.log("删除帖子草稿");
    let canCancel = Taro.getStorageSync("canCancel");
    if (canCancel) {
      return;
    }
    // 退出时，useState的数据可能已经被清空，重置为初始值
    let draftPostId = Number(Taro.getStorageSync("postId"));
    const data = await DeleteDraftAPI(draftPostId);
    console.log(data);
  };
  useDidShow(async () => {
    // 获取标签列表
    initTagList();
    // 创建帖子草稿
    createDraft();
  });
  // 卸载时删除帖子草稿，useDidHide不行
  useEffect(() => {
    return () => {
      // setCommentText("");
      // setTagIds([]);
      // setFiles([]);
      // 删除帖子草稿
      deleteDraft();
    };
  }, []);
  // 获取标签列表
  const initTagList = async () => {
    const res = await getTags();
    if (res.code != "00000") {
      //@ts-ignore
      Taro.atMessage({
        message: "获取标签列表失败",
        type: "error",
        duration: 800,
      });
      return;
    }
    setTagList(res.data.list);
  };
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
    if (tagIds.length == 0) {
      // @ts-ignore Taro缺少atMessage声明，忽略报错
      Taro.atMessage({
        message: "请选择标签",
        type: "error",
        duration: 800,
      });
      return;
    }
    // 一次性上传所有图片
    const resQuese = files.map(async (file) => {
      console.log(file);
      return uploadImage(file.url, postId);
      // console.log(res);
    });
    const resList = await Promise.all(resQuese);
    console.log(resList);

    // return;
    const res = await publishPost({
      postId,
      content: commentText,
      tagIds,
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
    // ## debugger
    // 设置不可取消发布，阻止删除帖子草稿
    Taro.setStorageSync("canCancel", true);

    Taro.switchTab({ url: "/pages/forum/forum" });
    // onPublish(commentText);
    setCommentText("");
  };
  /**
   * @description 标签添加或删除
   */
  const handleTagChange = (id: number) => {
    if (tagIds.includes(id)) {
      setTagIds(tagIds.filter((item) => item != id));
    } else {
      setTagIds([...tagIds, id]);
    }
  };
  return (
    <>
      <View className="post-new">
        {/* <Input
        className="input-box"
        value={commentText}
        onInput={(e) => setCommentText(e.detail.value)}
        placeholder="请输入评论内容"
      /> */}
        <View className="header">
          <View className="title" onClick={handleUpload}>
            热搜
          </View>
          <ScrollView scrollX className="scroll-container">
            {tagList.map((tag) => (
              <AtTag
                size="small"
                key={tag.id}
                className={
                  tagIds.includes(tag.id)
                    ? "tag-item tag-item-active"
                    : "tag-item"
                }
                onClick={() => handleTagChange(tag.id)}
              >
                # {tag.name}
              </AtTag>
            ))}
          </ScrollView>
        </View>
        <Textarea
          value={commentText}
          maxlength={200}
          placeholder="请输入帖子内容..."
          className="textarea"
          onInput={(e) => setCommentText(e.detail.value)}
          style="min-height:200rpx"
          autoHeight
        />
        <AtImagePicker files={files} onChange={onImageFileChange} />
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
      </View>
      <Button className="publish-button" onClick={handlePublish}>
        发布
      </Button>
    </>
  );
}

export default CommentInput;
