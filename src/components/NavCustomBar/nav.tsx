import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { Component } from "react";
import "./nav.scss";

type NavCustomBarProps = Readonly<{
  needBackIcon?: boolean;
  mainTitle?: string;
}>;
type NavCustomBarState = Readonly<{
  navBarHeight: number;
}>;

/**
 * @description 自定义顶部导航栏组件
 * @param {boolean} needBackIcon 是否需要返回按钮
 * @param {string} mainTitle 主标题
 * */
class NavCustomBar extends Component {
  constructor(props: NavCustomBarProps) {
    super(props);
    // this.props = props;
  }
  state: NavCustomBarState = {
    navBarHeight: 0,
  };
  props: NavCustomBarProps;

  componentWillMount() {
    this.getNavHeight();
    // console.log("componentWillMount", this.props);
  }

  getNavHeight() {
    let menuButtonObject = Taro.getMenuButtonBoundingClientRect();
    console.log("wx.getMenuButtonBoundingClientRect()", menuButtonObject);
    var sysinfo = Taro.getSystemInfoSync();
    console.log("wx.getSystemInfoSync()", sysinfo);
    let statusBarHeight = sysinfo.statusBarHeight as number;
    let menuBottonHeight = menuButtonObject.height;
    let menuBottonTop = menuButtonObject.top;
    let navBarHeight =
      statusBarHeight +
      menuBottonHeight +
      (menuBottonTop - statusBarHeight) * 2;
    this.setState({
      navBarHeight,
    });
    Taro.setStorageSync("nav_bar_height", navBarHeight);
  }

  goBackPage() {
    Taro.navigateBack({
      delta: 1,
    });
  }

  render() {
    let { needBackIcon = true, mainTitle = "" } = this.props;
    return (
      <View className="nav-custom-container">
        {/* nav custom */}
        <View
          className="nav_custom_bar"
          style={{ height: ` ${this.state.navBarHeight}px` }}
        >
          <AtIcon
            className={`nav_custom_bar_back ${needBackIcon ? "" : "hidden"}`}
            value="chevron-left"
            size="22"
            color="#fff"
            onClick={() => {
              this.goBackPage();
            }}
          ></AtIcon>
          <Text className="nav_custom_bar_title">{mainTitle}</Text>
          <View></View>
        </View>
        {/* 占位 */}
        <View
          className="nav_custom_bar_layout"
          style={{ height: ` ${this.state.navBarHeight}px` }}
        ></View>
      </View>
    );
  }
}
export default NavCustomBar;
