import { View, Text, Image } from "@tarojs/components";
import forum_ad from "../../assets/ad/banner.png";
import "./pc.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import o from "$/utils/request";
import MenuList from "$/components/personalCenter/MenuList";
import { AtAvatar } from "taro-ui";
import "taro-ui/dist/style/components/avatar.scss";
import { useState } from "react";
// import staticAvatar from "../../assets/avatar.jpg";

const pc = () => {
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("加载中");
  const [school, setSchool] = useState("加载中");
  // 菜单的数据
  // let slogan = "加载中";
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
      isOther: true,
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
    {
      content: "我创建的局",
      icon: "chevron-right",
      path: "/pages/personalCenter/myJoinedGather/joinedGather",
    },
    {
      content: "我收藏的",
      icon: "chevron-right",
      path: "/pages/personalCenter/myCollect/collect",
    },
    {
      content: "我发的帖子",
      icon: "chevron-right",
      path: "/pages/personalCenter/myPost/post",
    },
  ];

  // 页面展示时检测登录状态
  async function checkLogin() {
    // let token = Taro.getStorageSync("Authorization");
    let res;
    // if (token === "") {
    //   Taro.navigateTo({
    //     url: "/pages/login/login",
    //   });
    // } else {
    res = await o.get("/user/info", "");
    setNickname(res.data.nickname);
    setAvatar(res.data.avatarUrl);
    setSchool(res.data.school);
    Taro.setStorageSync("avatar", res.data.avatarUrl);
    // console.log("LOGIN RES:", res);
    return res;
    // }
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
      <View className="pc-head-card">
        {/* nav */}
        <View
          className="pc-nav-custom"
          style={{
            /* @ts-ignore 传入scss变量调整位置 */
            height: Taro.getStorageSync("nav_bar_height") + "px",
          }}
        >
          <Text>个人中心</Text>
        </View>
        {/* head */}
        <View
          className="pc-head-body"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/personalCenter/changeUserInfo/changeUserInfo",
            })
          }
        >
          <AtAvatar
            image={avatar}
            size="large"
            circle={true}
            className="my-avatar"
          ></AtAvatar>
          <View className="name-slogan">
            <Text className="nickname">{nickname}</Text>
            <Text className="slogan">{school}</Text>
          </View>
        </View>
        {/* other */}
        <View className="pc-head-other">
          <View className="more-item">
            <Text>人品</Text>
            <Text>0</Text>
          </View>
          <View className="more-item">
            <Text>收藏</Text>
            <Text>0</Text>
          </View>
          <View className="more-item">
            <Text>帖子</Text>
            <Text>0</Text>
          </View>
          <View className="more-item">
            <Text>评论</Text>
            <Text>0</Text>
          </View>
        </View>
      </View>
      {/* 广告 */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={forum_ad}
          mode="scaleToFill"
          style={{
            width: "100%",
            height: "97px",
            padding: "8px 8px",
            borderRadius: "34px",
          }}
        />
      </View>
      {/* 跳转列表部分 */}
      <MenuList list={menuList}></MenuList>
    </View>
  );
};

export default pc;
