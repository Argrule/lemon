import { View } from "@tarojs/components";
import "./pm.scss";
import { FormatTimeYearMonthDay } from "$/utils/dayjs";

export default function PostMsg({ msg }) {
  console.log(msg);
  return (
    <View className="msg-container">
      <View className="msg-container-title">帖子动态</View>
      {msg.map((item, index) => {
        return (
          <View className="msg-item" key={index}>
            <View className="msg-item-title">帖子新增 1 条评论</View>
            <View className="msg-item-content">{item.content}</View>
            <View className="msg-item-time">
              <View style={{ color: " #5C6B90", fontSize: "24rpx" }}>
                取消追踪
              </View>
              <View style={{ fontSize: "24rpx" }}>
                {FormatTimeYearMonthDay(item.createTime)}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
