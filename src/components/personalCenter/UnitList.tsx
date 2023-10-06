import { View, Text } from "@tarojs/components";
import { Label, Button } from "@tarojs/components";
import "./unitList.scss";
import { AtIcon } from "taro-ui";
import { UnitData } from "./personalCenter";
import Taro from "@tarojs/taro";

const UnitList = (props: UnitData) => {
  const { content, icon, path, isOther } = props;

  // let isOpened = false;
  const handleClick = (path: string) => {
    if (!isOther && path !== "") {
      console.log(path);
      Taro.navigateTo({
        url: path,
      });
    }
  };
  return (
    <View className="unitlist" onClick={() => handleClick(path)}>
      {isOther ? (
        <>
          <Label for={new Date().getTime().toString()} style="width:100%">
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
          <Text>{content}</Text>
          <AtIcon value={icon} size="16" color="rgb(122,122,122)"></AtIcon>
        </>
      )}
    </View>
  );
};

export default UnitList;
