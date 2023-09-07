export default defineAppConfig({
  pages: [
    "pages/index/index", // 入口第一个默认是首页
    "pages/learningLibrary/lb",
    "pages/findCard/fc",
    "pages/login/login",
    "pages/forum/forum",
    "pages/personalCenter/pc",
    "pages/personalCenter/setting/setting",
    "pages/gather/gather",
    "pages/myGather/gather",
    "pages/gather/createGather/createGather",
    'pages/gather/joinedGather/joinedGather',
    "pages/gather/gatherDetail/gatherDetail",
    "pages/sendPost/sp",
    "pages/comment/c",
    "pages/developing/developing",
    "pages/personalCenter/userAgreement/userAgreement",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
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
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/tabbar/func.png",
        selectedIconPath: "./assets/tabbar/func-active.png",
      },
      {
        pagePath: "pages/gather/gather",
        text: "攒局",
        iconPath: "./assets/tabbar/gather.png",
        selectedIconPath: "./assets/tabbar/gather-active.png",
      },
      {
        pagePath: "pages/forum/forum",
        text: "论坛",
        iconPath: "./assets/tabbar/forum.png",
        selectedIconPath: "./assets/tabbar/forum-active.png",
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
