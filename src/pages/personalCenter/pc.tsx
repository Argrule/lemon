import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './pc.scss'

export default class Personalcenter extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='personalCenter'>
        <Text>Hello Personal Center!</Text>
      </View>
    )
  }
}
