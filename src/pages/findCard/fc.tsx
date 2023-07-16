import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

export default class FindCard extends Component<PropsWithChildren<any>> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>find student's card</Text>
      </View>
    )
  }
}