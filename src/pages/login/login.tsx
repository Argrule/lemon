import { View, Text, Image, Checkbox } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import nothing from "../../assets/nothing.svg";
import o from "$/utils/request";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./login.scss";
import { useState } from "react";

export default function Login() {
  useLoad(() => {
    console.log("login page loaded");
  });

  const [checked, setChecked] = useState(false);
  /**
   * @description 登录
   */
  const handleLogin = () => {
    if (!checked) {
      Taro.showToast({
        title: "请先同意用户协议",
        icon: "none",
      });
      return;
    }
    signInPost();
  };
  /**
   * @description 改变checkbox状态
   */
  const handleChangeCheckStatus = () => {
    console.log("checked", checked);
    setChecked(!checked);
  };
  /**
   * @description 跳转到用户协议
   */
  const switchToPrivacy = () => {
    Taro.navigateTo({
      url: "/pages/personalCenter/userAgreement/userAgreement",
    });
  };
  return (
    // <View className="login">
    //   <Text>sign in！</Text>
    //   <AtButton type="secondary" onClick={signInPost}>
    //     一键登录
    //   </AtButton>
    // </View>
    <View className="login-root">
      <View className="main">
        <Image src={nothing}></Image>
        <AtButton type="primary" className="btn" onClick={handleLogin}>
          一键登录
        </AtButton>
        <View className="privacy-content">
          <Checkbox
            value="选中"
            onClick={handleChangeCheckStatus}
            color="#f7c511"
          ></Checkbox>
          <View>
            <Text className="text">已阅读并同意</Text>
            <Text className="text-p" onClick={switchToPrivacy}>
              用户隐私协议
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * @description 登录
 */
function signInPost() {
  Taro.login({
    success: async function (res) {
      if (res.code) {
        //发起网络请求
        const res_data = await o.post("/sign/in", { code: res.code });
        Taro.setStorageSync("Authorization", res_data.data.token);
        Taro.navigateBack({
          delta: 1,
        });
      } else {
        console.log("登录失败！" + res);
      }
    },
  });
}
