import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './login.scss'


export default class Login extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='login'>
        <Text>Hello login!</Text>
      </View>
    )
  }
}
