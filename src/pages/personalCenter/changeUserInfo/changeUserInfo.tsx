import { View, Text, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/image-picker.scss";
import "taro-ui/dist/style/components/icon.scss";
import { useState } from "react";
import "./changeUserInfo.scss";
import { AtInput } from "taro-ui";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import o from "$/utils/request";

const changeUserInfo = () => {
  Taro.setNavigationBarTitle({
    title: "修改用户信息",
  });
  const [avatarUrl, setAvatarUrl] = useState(
    Taro.getStorageSync("avatar").toString()
  );
  const [nickname, setNickname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const chooseImage = () => {
    Taro.chooseImage({
      count: 1, // 最多只能选择一张图片
      sizeType: ["compressed"], // 压缩图片
      sourceType: ["album", "camera"], // 从相册或拍照获取
      success: (res) => {
        setAvatarUrl(res.tempFilePaths[0]); // 将选择的图片临时地址保存到state中
        console.log("AVATAR URL:", res.tempFilePaths[0]);
        Taro.uploadFile({
          url: "https://hangzhoukj.cn/user/update/avatar", // 替换成你的上传接口地址
          filePath: res.tempFilePaths[0],
          name: "file",
          header: {
            "content-type": "multipart/form-data",
            Authorization: Taro.getStorageSync("Authorization"),
          },
          success: (res) => {
            // 上传成功后的处理逻辑
            console.log("上传成功", res);
          },
          fail: (error) => {
            // 上传失败后的处理逻辑
            console.error("上传失败", error);
          },
        });
      },
    });
  };
  function handleNickname(value) {
    setNickname(value);
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  function handlePhoneNum(value) {
    setPhoneNum(value);
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  function submit() {
    o.post("/user/update/info", {
      nickName: nickname,
      phoneNum,
    }).then((res) => {
      //   console.log("RES::::", res);
      if (res.code === "00000") {
        Taro.navigateBack({ delta: 1 });
      }
    });
  }
  return (
    <View className="root">
      <Image
        src={avatarUrl}
        mode="aspectFit"
        style={{ width: "70vw", height: "70vw" }}
        onClick={chooseImage}
      />
      <Text>点击头像上传</Text>
      <AtInput
        name="昵称"
        value={nickname}
        placeholder="昵称"
        onChange={(val) => handleNickname(val)}
      ></AtInput>
      <AtInput
        name="手机号"
        value={phoneNum}
        placeholder="手机号"
        onChange={(val) => handlePhoneNum(val)}
      ></AtInput>
      <Button onClick={() => submit()}>更改用户信息</Button>
    </View>
  );
};

export default changeUserInfo;
