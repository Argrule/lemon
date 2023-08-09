import { View, Text } from '@tarojs/components'
import Taro,{useLoad} from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './login.scss'

export default function Login() {
    useLoad(() => {
      console.log('login page loaded')
    })

    return (
      <View className='login'>
        <Text>sign in！</Text>
        <AtButton type='primary' onClick={sayhi}>源神！ 启动！！</AtButton>
      </View>
    )
}

function sayhi() {
  Taro.login({
    success: function (res) {
      if (res.code) {
        console.log("get jscode =======:",res.code)
        //发起网络请求
        // Taro.request({
        //   url: 'https://test.com/onLogin',
        //   data: {
        //     code: res.code
        //   }
        // })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}