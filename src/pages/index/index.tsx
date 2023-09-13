import { View, Text, Button, GridView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

import o from "$/utils/request";
import { AtIcon } from "taro-ui";
import { useState } from "react";

export default function Index() {
  const [iconSize,setIconSize] =useState(30);
  return (
    <View className="index">
      <Button onClick={sayhi} className="sayhi" style={"visibility:hidden"}>
        Hello Index
      </Button>
      <GridView type="aligned" crossAxisCount={3} mainAxisGap={20} crossAxisGap={15}>
        {/* <View className="container flex"> */}
        <View className="flex-col">
          <AtIcon value="camera" size={iconSize} color="#ecc745" />
          <Text className="icon-text">课程查询</Text>
        </View>
        <View className="flex-col">
          <AtIcon value="bookmark" size={iconSize} color="#ecc745" />
          <Text className="icon-text">成绩查询</Text>
        </View>
        <View className="flex-col">
          <AtIcon value="calendar" size={iconSize} color="#ecc745" />
          <Text className="icon-text">场所开放</Text>
        </View>
        {/* </View> */}
        {/* <View className="container flex"> */}
        <View className="flex-col">
          <AtIcon value="equalizer" size={iconSize} color="#ecc745" />
          <Text className="icon-text">校园地图</Text>
        </View>
        <View className="flex-col">
          <AtIcon value="lightning-bolt" size={iconSize} color="#ecc745" />
          <Text className="icon-text">校园电话本</Text>
        </View>
        <View className="flex-col">
          <AtIcon value="shopping-bag" size={iconSize} color="#ecc745" />
          <Text className="icon-text">校历</Text>
        </View>
        {/* </View> */}
        {/* <View className="container flex"> */}
        <View className="flex-col">
          <AtIcon value="numbered-list" size={iconSize} color="#ecc745" />
          <Text className="icon-text">学习资料库</Text>
        </View>
        <View className="flex-col">
          <AtIcon value="list" size={iconSize} color="#ecc745" />
          <Text className="icon-text">馆藏查询</Text>
        </View>
        <View className="flex-col">
          <AtIcon value="money" size={iconSize} color="#ecc745" />
          <Text className="icon-text">校园卡寻回</Text>
        </View>
        {/* </View> */}
      </GridView>
    </View>
  );
}

function sayhi() {
  Taro.chooseImage({
    count: 1,
  }).then((res) => {
    console.log(res);
  });
  console.log("hi");
  o.get("/dev/getHaoKanVideo?page=0&size=1").then((res) => {
    console.log(res[0]);
  });
  Taro.navigateTo({ url: "/pages/login/login" });
}
