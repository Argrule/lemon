import { View, Image } from '@tarojs/components';
import { AtButton,AtMessage } from 'taro-ui';
import { useState,useEffect, } from 'react';


// import { getGatherList,getTagList } from "$/api/gather";
import { joinGather } from "$/api/gather";
import Taro from "@tarojs/taro";

// import request from '$/utils/request'

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/progress.scss"
import './gatherDetail.scss';


export default function GatherDetail() {
  // const router = useRouter();
  const [gatherData, setGatherData] = useState(null);

  useEffect(() => {
    const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();

    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('Received data:', data.gather);

      // 将接收到的数据存储到组件状态中
      setGatherData(data.gather);
    });

    // 返回函数用于清除监听器，以避免内存泄漏
    return () => {
      eventChannel.off('acceptDataFromOpenerPage');
    };

  }, []);

  const handleSubmit = async () => {
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    console.log('gatherData.id',gatherData.id);

    const res = await joinGather({
      teamId:gatherData?.id
    });
    console.log('res',res);

    if (res.code === '00000') {
      Taro.atMessage({
        message: '加入成功',
        type: 'success',
      });
      //更改为已加入状态//todo
    } else if(res.code === 'A0400'){
      Taro.atMessage({
        message: '已在队中',
        type: 'error',
      });
    } else{
      Taro.atMessage({
        message: '加入失败',
        type: 'error',
      });
    }
  };

  return (
    <View className='container'>
      {/* <View className="membersContainer">
        <View className="title">局内成员</View>
      </View> */}
      <View className='detailContainer'>
        <View className='directorInfo'>
          <View className='avatar'>
            <Image
              mode='widthFix'
              src='https://s2.loli.net/2023/05/13/cln1tpJuZG8wTrP.jpg'
              style='width: 50px; height: 50px; border-radius: 50%;margin-left: 4vw; margin-right: 5vw'
            />
          </View>
          <View className='name'>肥肥鲨</View>
        </View>
        <View className='detail'>
          <View className='title'>局情</View>
        <View className='content'>{gatherData?.description}</View>
        </View>
      </View>
      <View className='joinButton'>
        <AtButton type='primary' circle onClick={handleSubmit}>
          申请入局
        </AtButton>
        <AtMessage />
      </View>
    </View>
  );
}
