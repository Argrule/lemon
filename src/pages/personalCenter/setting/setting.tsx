import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import nothing from "../../../assets/nothing.svg";
import "./setting.scss";
const setting = () => {
  Taro.setNavigationBarTitle({
    title: "设置",
  });

  return (
    <View className="setting-root">
      <View className="main">
        <Image src={nothing}></Image>
        <Text>暂无设置项哦</Text>
      </View>
    </View>
  );
};

export default setting;
