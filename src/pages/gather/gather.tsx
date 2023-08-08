import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './gather.scss'

export default function Gather(){
    return (
      <View className='gather'>
        <AtButton type='primary' circle={true} onClick={()=>console.log('hh')}>genshin impact launch!!!</AtButton>
      </View>
    )  
}
