import { View, Image } from "@tarojs/components";
import NavCustomBar from "$/components/NavCustomBar/nav";
import info_comment from "../../assets/info/comment.svg";
import info_support from "../../assets/info/support.svg";
import info_gather from "../../assets/info/gather.svg";
import info_privchat from "../../assets/info/privchat.svg";
import "./msg.scss";
import { getMessages, MessageItem } from "$/api/message";
import { useDidShow } from "@tarojs/taro";
import PostMsg from "$/components/postMsg/pm";
import { useState } from "react";

export default function Message() {
  // 4个功能按钮的配置项
  const funcList = [
    {
      icon: info_comment,
      text: "评论",
      bgc: "#81adf8",
      width: "48rpx",
      height: "50rpx",
    },
    {
      icon: info_support,
      text: "赞赏",
      bgc: "#F47E7A",
      width: "56rpx",
      height: "48rpx",
    },
    {
      icon: info_gather,
      text: "攒局",
      bgc: "#FFB541",
      width: "56rpx",
      height: "56rpx",
    },
    {
      icon: info_privchat,
      text: "私信",
      bgc: "#78EC95",
      width: "51rpx",
      height: "40rpx",
    },
  ];

  const [msgList, setMsgList] = useState<MessageItem[]>([]);

  useDidShow(() => {
    getMessages({
      typeId: 1, // 1评论
      pageNum: 1,
      pageSize: 10,
    }).then((res) => {
      setMsgList(res.msgDtoList);
    });
  });

  return (
    <View className="info-page">
      {/* 顶部导航栏 */}
      <NavCustomBar mainTitle="消息" needBackIcon={false} />
      {/* 4个功能按钮 */}
      <View className="info-func">
        {funcList.map((item) => (
          <View className="func-container">
            <View
              className="func-icon"
              style={{
                backgroundColor: item.bgc,
              }}
            >
              <Image
                src={item.icon}
                svg
                style={{ width: item.width, height: item.height }}
              />
            </View>
            {item.text}
          </View>
        ))}
      </View>
      {/* 消息列表 */}
      <View style={{ background: "#F7F7F7", border: "1rpx solid transparent" }}>
        <PostMsg msg={msgList} />
      </View>
    </View>
  );
}
