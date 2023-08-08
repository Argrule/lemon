const base_url_api="http://localhost:3000"
const base_url_dev="https://api.apiopen.top"

const getBaseUrl = (url) => {
    let BASE_URL = '';
    if (process.env.NODE_ENV === 'development') {
      //开发环境 - 根据请求不同返回不同的BASE_URL
      if (url.includes('/api/')) {
        BASE_URL = base_url_api
      } else if (url.includes('/dev/')) {
        BASE_URL = base_url_dev
      }
    } else {
      // 生产环境
      if (url.includes('/api/')) {
        BASE_URL = base_url_api
      } else if (url.includes('/dev/')) {
        BASE_URL = base_url_dev
      }
    }
    return BASE_URL
  }
  
  export default getBaseUrl;