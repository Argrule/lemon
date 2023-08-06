import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

export default class MyTest extends Component<PropsWithChildren<any>> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>test component</Text>
      </View>
    )
  }
}