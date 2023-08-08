import { Component, PropsWithChildren } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

import o from '$/utils/request'
// import { AtButton } from 'taro-ui'
// import "taro-ui/dist/style/components/button.scss" // 按需引入

export default class Index extends Component<PropsWithChildren<any>> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>use text</Text>
        <Button onClick={sayhi} className='sayhi'>
          Hello Index
        </Button>
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
  o.get('/dev/getHaoKanVideo?page=0&size=1').then(res => {
    console.log(res[0])
  })
  Taro.navigateTo({url:'/pages/login/login'})
}