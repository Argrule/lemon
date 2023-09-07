import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import houseWork from "../../assets/doHouseWork.svg";
import "./developing.scss";
import React from "react";
const developing = () => {
  Taro.setNavigationBarTitle({
    title: "开发中",
  });

  return (
    <View className="developing-root">
      <View className="main">
        <Image src={houseWork}></Image>
        <Text>功能正在开发中，敬请期待</Text>
      </View>
    </View>
  );
};

export default developing;
