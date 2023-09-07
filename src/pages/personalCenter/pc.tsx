import { View, Text } from "@tarojs/components";
import "./pc.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import o from "$/utils/request";
import MenuList from "$/components/personalCenter/MenuList";
import { AtAvatar } from "taro-ui";
import "taro-ui/dist/style/components/avatar.scss";
import { useState } from "react";

const pc = () => {
  const [avatar, serAvatar] = useState("");
  // 菜单的数据
  let nickname = "加载中";
  let slogan = "加载中";
  const menuList = [
    {
      content: "消息",
      icon: "chevron-right",
      path: "/pages/developing/developing",
    },
    {
      content: "推荐好友",
      icon: "chevron-right",
      path: "/pages/developing/developing",
    },
    {
      content: "设置",
      icon: "chevron-right",
      path: "/pages/personalCenter/setting/setting",
    },
    {
      content: "用户协议",
      icon: "chevron-right",
      path: "/pages/personalCenter/userAgreement/userAgreement",
    },
    {
      content: "版本",
      icon: "chevron-right",
      path: "/pages/developing/developing",
    },
  ];
  async function checkLogin() {
    let token = Taro.getStorageSync("Authorization");
    let res;
    if (token === "") {
      Taro.navigateTo({
        url: "/pages/login/login",
      });
    } else {
      res = await o.get("/user/info", "");
      console.log("LOGIN RES:", res);
      return res;
    }
  }
  useDidShow(() => {
    console.log("SHOW");
    checkLogin();
  });
  // console.log("TOKEN:", Taro.getStorageSync("Authorization"));
  Taro.getStorageSync("Authorization");
  return (
    <View className="personalCenter">
      {/* 头像部分 */}
      <View className="head-card">
        <AtAvatar
          image={avatar}
          size="large"
          circle={true}
          className="my-avatar"
        ></AtAvatar>
        <View className="name-slogan">
          <Text className="nickname">{nickname}</Text>
          <Text className="slogan">{slogan}</Text>
        </View>
      </View>
      {/* 跳转列表部分 */}
      <MenuList list={menuList}></MenuList>
    </View>
  );
};

export default pc;
