import { View, Swiper, SwiperItem } from "@tarojs/components";
import "./hp.scss";

export const HotPost = () => {
  return (
    <View
      className="hp-container"
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      {/* 左侧文案 */}
      <View className="flex-row hp-left">十大热帖</View>
      {/* 右侧走马灯 */}
      <Swiper
        className="hp-swiper"
        style={{ height: "174rpx", width: "80%" }}
        indicatorColor="#999"
        indicatorActiveColor="#333"
        vertical
        circular
        autoplay
        adjustVerticalHeight={"first"}
      >
        <SwiperItem style={{ borderRadius: "0 10px 10px 0" }}>
          <View className="hp-swiper-item">1 测试的热搜帖子</View>
          <View className="hp-swiper-item">2 测试的热搜帖子copy</View>
        </SwiperItem>
        <SwiperItem>
          <View className="hp-swiper-item">3</View>
          <View className="hp-swiper-item">4</View>
        </SwiperItem>
      </Swiper>
    </View>
  );
};
