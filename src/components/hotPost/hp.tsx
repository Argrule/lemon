import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import { Item } from "$/pages/forum/data";
import "./hp.scss";
import { useEffect, useState } from "react";
import detail_look from "../../assets/detailLook.svg";

export const HotPost = ({ hotPosts }) => {
  const [showPost, setShowPost] = useState<Array<Item[]>>([]);

  useEffect(() => {
    let temp: Item[][] = [];
    for (let i = 0; i < hotPosts.length; i += 2) {
      temp.push([hotPosts[i], hotPosts[i + 1]]);
    }
    setShowPost(temp);
  }, [hotPosts]);

  return (
    <View
      className="hp-container"
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      {/* 左侧文案 */}
      <View className="flex-col hp-left just-center">
        十大热帖
        <Image
          svg
          src={detail_look}
          mode="aspectFit"
          style={{ width: "25%", height: "30%" }}
        ></Image>
      </View>
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
        {showPost.map((item, index) => {
          index = index * 2 + 1;
          return (
            <SwiperItem
              style={{ borderRadius: "0 10px 10px 0" }}
              key={item[0].id}
            >
              <View className="hp-swiper-item">
                <Text className="hp-swiper-item-seq">{"0" + index}</Text>
                <Text
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    width: "90%",
                    verticalAlign: "middle",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item[0].content.replace(/[\n]/g, " ")}
                </Text>
              </View>
              <View className="hp-swiper-item">
                <Text className="hp-swiper-item-seq">
                  {index === 9 ? "" + (index + 1) : "0" + (index + 1)}
                </Text>
                <Text
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    width: "90%",
                    verticalAlign: "middle",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item[1].content.replace(/[\n]/g, " ")}
                </Text>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
};
