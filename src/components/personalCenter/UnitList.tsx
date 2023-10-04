import { View, Text } from "@tarojs/components";
import "./unitList.scss";
import { AtIcon } from "taro-ui";
import { UnitData } from "./personalCenter";
import Taro from "@tarojs/taro";
import React from "react";

const UnitList = (props: UnitData) => {
  const { content, icon, path } = props;

  let isOpened = false;
  const handleClick = (path: string) => {
    if (path !== "") {
      console.log(path);
      Taro.navigateTo({
        url: path,
      });
    }
  };
  return (
    <View className="unitlist" onClick={() => handleClick(path)}>
      <Text>{content}</Text>
      <AtIcon value={icon} size="16" color="rgb(122,122,122)"></AtIcon>
    </View>
  );
};

export default UnitList;
