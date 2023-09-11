import Taro from "@tarojs/taro";
import { pageToLogin } from "./utils";
import { HTTP_STATUS } from "./status";

const customInterceptor = (chain) => {
  // ## 请求发出前处理
  const requestParams = chain.requestParams;
  // 登录请求不转发token，如果有其他请求也不需要token，换成白名单做判断
  const { url } = requestParams;
  if (!url.includes("/sign/in")) {
    let token = Taro.getStorageSync("Authorization"); //拿到本地缓存中存的token
    requestParams.header = {
      ...requestParams.header,
      Authorization: token, //将token添加到头部
    };
  }

  // ## 请求后处理响应
  return chain.proceed(requestParams).then((res) => {
    console.log('requestParams',requestParams.url);
    console.log('res',res);
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "");
      pageToLogin();
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      var url = requestParams.url;
      if (url.includes("/post/show")) {
        console.log("字符串中包含 '/post/show'");
        return res.data;
      } else {
        console.log("字符串中不包含 '/post/show'");
        Taro.setStorageSync("Authorization", "");
        pageToLogin();
        return Promise.reject("需要鉴权");
      }
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
