const base_url_api = "https://hangzhoukj.cn";
const base_url_dev = "https://hangzhoukj.cn";

const getBaseUrl = (url) => {
  let BASE_URL = "";
  if (process.env.NODE_ENV === "development") {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    // if (url.includes('/api/')) {
    //   BASE_URL = base_url_api
    // } else if (url.includes('/dev/')) {
    //   BASE_URL = base_url_dev
    // }
    BASE_URL = base_url_api;
  } else {
    // 生产环境
    // if (url.includes('/api/')) {
    //   BASE_URL = base_url_api
    // } else if (url.includes('/dev/')) {
    //   BASE_URL = base_url_dev
    // }
    BASE_URL = base_url_api;
  }
  return BASE_URL;
};

export default getBaseUrl;
