import { View, Text, Image } from "@tarojs/components";
import forum_ad from "../../assets/ad/banner.png";
import "./pc.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import MenuList from "$/components/personalCenter/MenuList";
import { AtAvatar } from "taro-ui";
import "taro-ui/dist/style/components/avatar.scss";
import { useState } from "react";
import { getPersonInfo, PersonInfo } from "$/api/other";
// import staticAvatar from "../../assets/avatar.jpg";

const pc = () => {
  // 个人信息
  const [personInfo, setPersonInfo] = useState<PersonInfo>({
    avatarUrl: "",
    nickname: "加载中",
    school: "加载中",
    amount: 0,
    collectNum: 0,
    commentNum: 0,
    hashId: "",
    publishNum: 0,
  });
  // 菜单的数据
  // let slogan = "加载中";
  const menuList1 = [
    {
      content: "我创建的局",
      pre: "alert-circle",
      icon: "chevron-right",
      path: "/pages/personalCenter/myJoinedGather/joinedGather",
    },
    {
      content: "我的消息",
      pre: "mail",
      icon: "chevron-right",
      path: "/pages/message/msg",
    },
    {
      content: "推荐好友",
      pre: "share",
      icon: "chevron-right",
      path: "/pages/developing/developing",
      isOther: true,
    },
  ];
  const menuList2 = [
    {
      content: "设置",
      pre: "settings",
      icon: "chevron-right",
      path: "/pages/personalCenter/setting/setting",
    },
  ];
  const menuList3 = [
    {
      content: "版本更新",
      pre: "alert-circle",
      icon: "chevron-right",
      path: "/pages/developing/developing",
    },
    {
      content: "用户协议",
      pre: "menu",
      icon: "chevron-right",
      path: "/pages/personalCenter/userAgreement/userAgreement",
    },
  ];

  // 4个更多的数据
  const moreList = [
    {
      content: "人品",
      val: "amount",
      // path: "/pages/developing/developing"
    },
    {
      content: "收藏",
      val: "collectNum",
      path: "/pages/personalCenter/myCollect/collect",
    },
    {
      content: "帖子",
      val: "publishNum",
      path: "/pages/personalCenter/myPost/post",
    },
    {
      content: "评论",
      val: "commentNum",
    },
  ];

  // 页面展示时检测登录状态
  async function checkLogin() {
    const res = await getPersonInfo();
    setPersonInfo(res);
    Taro.setStorage({ key: "avatar", data: res.avatarUrl }); //异步
  }
  /**
   * @description 根据path返回跳转函数
   * @param path 跳转路径
   * @returns () => void
   */
  const navGotoPath = (path: string | undefined): (() => void) => {
    if (path) {
      return () =>
        Taro.navigateTo({
          url: path,
        });
    } else {
      return () => void 0;
    }
  };

  useDidShow(() => {
    checkLogin();
  });

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
            image={personInfo.avatarUrl}
            size="large"
            circle={true}
            className="my-avatar"
          ></AtAvatar>
          <View className="name-slogan">
            <Text className="nickname">{personInfo.nickname}</Text>
            <Text className="slogan">{personInfo.school}</Text>
          </View>
        </View>
        {/* other */}
        <View className="pc-head-other">
          {moreList.map((more) => (
            <View
              className="more-item"
              key={more.content}
              onClick={navGotoPath(more.path)}
            >
              <Text>{more.content}</Text>
              <Text>{personInfo[more.val]}</Text>
            </View>
          ))}
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
      <MenuList list={menuList1}></MenuList>
      <MenuList list={menuList2}></MenuList>
      <MenuList list={menuList3}></MenuList>
    </View>
  );
};

export default pc;
