// 暂时解决taro-ui3 组件类型声明缺失children属性的问题
declare module "react" {
  interface Component {
    children: React.ReactElement;
  }
}