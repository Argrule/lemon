import { View, Text } from "@tarojs/components";
import "./pc.scss";
import MenuList from "$/components/personalCenter/MenuList";
import { AtAvatar } from "taro-ui";
import "taro-ui/dist/style/components/avatar.scss";

const pc = () => {
  const avatar = require("../../assets/avatar.jpg");
  // 菜单的数据
  const nickname = "用户名";
  const slogan = "暂无签名";
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
