import { View } from "@tarojs/components";
import UnitList from "./UnitList";
import { UnitData } from "./personalCenter";
import "./menuList.scss";
import share_img from "../../assets/info/share.png";
import { useShareAppMessage, useShareTimeline } from "@tarojs/taro";

const MenuList = (props: { list: UnitData[] }) => {
  const menuList = props.list;

  /**
   * @description 分享朋友圈
   * 不支持path
   * */
  useShareTimeline(() => {
    let shareData = {
      title: "柠檬校园",
      path: "/pages/forum/forum", // 分享的路径
      imageUrl: "", // 分享的图片链接
    };
    return shareData;
  });
  /**
   * @description 分享小程序给好友
   */
  useShareAppMessage((res) => {
    let shareData = {
      title: "柠檬校园",
      path: "/pages/forum/forum", // 分享的路径
      imageUrl: share_img, // 分享的图片链接
    };
    // if (res.from === "button") {
    //   // 来自页面内分享按钮
    // } else {
    //   // 右上角分享好友
    // }
    return shareData;
  });

  return (
    <View className="menu-list">
      {menuList.map((item) => {
        return (
          <UnitList
            content={item.content}
            icon={item.icon}
            path={item.path}
            isOther={item.isOther ?? false}
          ></UnitList>
        );
      })}
    </View>
  );
};

export default MenuList;
