import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
//自定义组件
import MyTest from '$/components/MyTest'

export default class FindCard extends Component<PropsWithChildren<any>> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Text>find student's card</Text>
        <MyTest />
      </View>
    )
  }
}