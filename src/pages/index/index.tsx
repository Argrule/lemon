import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
// import { AtButton } from 'taro-ui'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import Taro from '@tarojs/taro'

export default class Index extends Component<PropsWithChildren<any>> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>use text</Text>
        <button onClick={sayhi} className='sayhi'>
          Hello
        </button>
        {/* <AtButton type='primary'>I need Taro UI</AtButton>
        <Text>Taro UI 支持 Vue 了吗？</Text>
        <AtButton type='primary' circle={true}>支持</AtButton>
        <AtButton type='secondary' circle={true} onClick={sayhi}>click</AtButton> */}
      </View>
    )
  }
}

function sayhi() {
  console.log('hi')
  Taro.navigateTo({url:'/pages/findCard/fc'})
}