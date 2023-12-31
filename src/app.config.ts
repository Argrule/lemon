export default defineAppConfig({
  pages: [
    "pages/forum/forum", // 入口第一个默认是首页
    "pages/index/index", // 入口第一个默认是首页
    "pages/learningLibrary/lb",
    "pages/findCard/fc",
    "pages/login/login",
    "pages/personalCenter/pc",
    "pages/personalCenter/setting/setting",
    "pages/gather/gather",
    "pages/personalCenter/myJoinedGather/joinedGather",
    "pages/gather/createGather/createGather",
    "pages/gather/joinedGather/joinedGather",
    "pages/gather/gatherDetail/gatherDetail",
    "pages/gather/searchGather/searchGather",
    "pages/sendPost/sp",
    "pages/comment/c",
    "pages/developing/developing",
    "pages/personalCenter/userAgreement/userAgreement",
    "pages/personalCenter/myPost/post",
    "pages/personalCenter/myCollect/collect",
    "pages/personalCenter/changeUserInfo/changeUserInfo",
    "pages/message/msg",
    "pages/search/s",
    "pages/commentRule/cr",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#FFF9DE",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#515151",
    selectedColor: "#f4ea2a",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/forum/forum",
        text: "论坛",
        iconPath: "./assets/tabbar/forum.png",
        selectedIconPath: "./assets/tabbar/forum-active.png",
      },
      // {
      //   pagePath: "pages/index/index",
      //   text: "功能",
      //   iconPath: "./assets/tabbar/func.png",
      //   selectedIconPath: "./assets/tabbar/func-active.png",
      // },
      {
        pagePath: "pages/message/msg",
        text: "消息",
        iconPath: "./assets/tabbar/msg.png",
        selectedIconPath: "./assets/tabbar/msg-active.png",
      },
      {
        pagePath: "pages/sendPost/sp",
        text: "发帖",
        iconPath: "./assets/tabbar/plus.png",
        selectedIconPath: "./assets/tabbar/plus-active.png",
      },
      {
        pagePath: "pages/gather/gather",
        text: "攒局",
        iconPath: "./assets/tabbar/gather.png",
        selectedIconPath: "./assets/tabbar/gather-active.png",
      },
      {
        pagePath: "pages/personalCenter/pc",
        text: "个人中心",
        iconPath: "./assets/tabbar/person.png",
        selectedIconPath: "./assets/tabbar/person-active.png",
      },
    ],
  },
});
