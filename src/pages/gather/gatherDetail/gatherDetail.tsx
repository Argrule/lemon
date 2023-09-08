import { View, Image } from '@tarojs/components';
import { AtButton,AtMessage } from 'taro-ui';
import { useState,useEffect, } from 'react';


// import { getGatherList,getTagList } from "$/api/gather";
import { joinGather,quitGather,deleteGather,getUserInfo} from "$/api/gather";
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
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();

    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('Received data:', data.gather);

      // 将接收到的数据存储到组件状态中
      setGatherData(data.gather);
      getInfo(data.gather.uid)
    });


    // 返回函数用于清除监听器，以避免内存泄漏
    return () => {
      eventChannel.off('acceptDataFromOpenerPage');
    };

  }, []);
  const getInfo = async (userId) => {
    try {
      let response;
      response = await getUserInfo({
        userId:userId
      });
      console.log('res',response);
      // 将接收到的数据存储到组件状态中
      setUserInfo(response);
    } catch (error) {
      console.error('Error fetching gather list', error);
    }
  };
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

  const handleQuit = async () => {
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    console.log('gatherData.id',gatherData.id);

    const res = await quitGather({
      teamId:gatherData?.id
    });
    console.log('res',res);

    if (res.code === '00000') {
      Taro.atMessage({
        message: '退出成功',
        type: 'success',
      });
      //更改为已加入状态//todo
    } else if(res.code === 'A0400'){
      Taro.atMessage({
        message: '不在队中',
        type: 'error',
      });
    } else{
      Taro.atMessage({
        message: '退出失败',
        type: 'error',
      });
    }
  };

  const handleDelete = async () => {
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    console.log('gatherData.id',gatherData.id);

    const res = await deleteGather({
      teamId:gatherData?.id
    });
    console.log('res',res);

    if (res.code === '00000') {
      Taro.atMessage({
        message: '炸局成功',
        type: 'success',
      });
      //更改为已加入状态//todo
    } else if(res.code === 'A0400'){
      Taro.atMessage({
        message: '非创建者本人无权取消',
        type: 'error',
      });
    } else{
      Taro.atMessage({
        message: '炸局失败',
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
              src={userInfo?.avatarUrl}
              style='width: 50px; height: 50px; border-radius: 50%;margin-left: 4vw; margin-right: 5vw'
            />
          </View>
          <View className='name'>{userInfo?.nickname}</View>
        </View>
        <View className='detail'>
          <View className='title'>局情</View>
        <View className='content'>{gatherData?.description}</View>
        </View>
      </View>
      <View className='joinButton'>
        <AtButton type='primary' circle onClick={handleSubmit} className='buttonItem'>
          申请入局
        </AtButton>
        <AtButton type='primary' circle onClick={handleQuit} className='buttonItem'>
          我要出局
        </AtButton>
        {/* <AtButton type='primary' circle onClick={handleDelete} className='buttonItem'>
          炸局
        </AtButton> */}
        <AtMessage />
      </View>
    </View>
  );
}
