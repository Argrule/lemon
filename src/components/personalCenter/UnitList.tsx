import { View, Text } from "@tarojs/components";
import { Label, Button } from "@tarojs/components";
import "./unitList.scss";
import { AtIcon } from "taro-ui";
import { UnitData } from "./personalCenter";
import Taro from "@tarojs/taro";

const UnitList = (props: UnitData) => {
  const { content, pre, icon, path, isOther } = props;

  // let isOpened = false;
  const handleClick = (path: string) => {
    if (!isOther && path !== "") {
      console.log(path);
      // 暂时处理跳转到我的消息的逻辑
      if (content === "我的消息") {
        Taro.switchTab({
          url: path,
        });
      } else
        Taro.navigateTo({
          url: path,
        });
    }
  };
  return (
    <View className="unitlist" onClick={() => handleClick(path)}>
      {isOther ? (
        <>
          {/* 特殊处理，用于分享小程序 */}
          <AtIcon value={pre} size="18" color="rgb(122,122,122)"></AtIcon>
          <Label
            for={new Date().getTime().toString()}
            style="width:100%;margin-left:10rpx"
          >
            {content}
          </Label>
          <Button
            style={{
              height: "0.1rpx",
              width: "0.1rpx",
              opacity: 0,
            }}
            id={new Date().getTime().toString()}
            openType="share"
          ></Button>
        </>
      ) : (
        <>
          {/* 一般处理 */}
          <View>
            <AtIcon value={pre} size="18" color="rgb(122,122,122)"></AtIcon>
            <Text style="margin-left:10rpx">{content}</Text>
          </View>
          <AtIcon value={icon} size="16" color="rgb(122,122,122)"></AtIcon>
        </>
      )}
    </View>
  );
};

export default UnitList;
