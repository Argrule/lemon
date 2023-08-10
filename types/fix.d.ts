// 暂时解决taro-ui3 组件类型声明缺失children属性的问题
// declare module "react" {
//   interface Component {
//     children: React.ReactElement;
//   }
// }

// 已经更新到taro-ui3.1.0-beta.4，修复了类型声明children缺失问题