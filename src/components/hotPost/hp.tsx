import { View, Swiper, SwiperItem } from "@tarojs/components";
import "./hp.scss";

export const HotPost = () => {
  return (
    <View className="flex hp-container" style={{ justifyContent: "space-evenly" }}>
      <View>十大热帖</View>
      <Swiper
        className="test-h"
        style={{ height: "60rpx", width: "80%" }}
        indicatorColor="#999"
        indicatorActiveColor="#333"
        vertical
        circular
        autoplay
        adjustVerticalHeight={"first"}
      >
        <SwiperItem>
          <View className="demo-text-1" style={{ background: "red" }}>
            1
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className="demo-text-2" style={{ background: "red" }}>
            2
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className="demo-text-3" style={{ background: "red" }}>
            3
          </View>
        </SwiperItem>
      </Swiper>
    </View>
  );
};
