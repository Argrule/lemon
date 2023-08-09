import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './forum.scss'

export default class Forum extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='forum'>
        <Text>Hello forum!</Text>
      </View>
    )
  }
}
