import { View, Image, ScrollView } from '@tarojs/components';
import { AtButton,AtMessage,AtFloatLayout } from 'taro-ui';
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
import "taro-ui/dist/style/components/float-layout.scss";
import './gatherDetail.scss';


export default function GatherDetail() {
  // const router = useRouter();
  const [isGather, setIsGather] = useState(false);
  const [isLeader, setisLeader] = useState(false);
  const [gatherData, setGatherData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [avatorList, setAvatorList] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [createTime, setCreateTime] = useState(null);




  useEffect(() => {
    const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();

    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('Received data:', data.gather);
      setIsGather(data.isJoined)
      setisLeader(data.isLeader)
      // 将接收到的数据存储到组件状态中
      setGatherData(data.gather);
      getInfo(data.gather.uid);
      getAvator(data.gather.uidArray)
      setCreateTime(data.gather.createTime)
      // console.log(data.gather.uid);
      // console.log(data.gather.uidArray);
      console.log('gatherData',gatherData);

    });


    // 返回函数用于清除监听器，以避免内存泄漏
    return () => {
      eventChannel.off('acceptDataFromOpenerPage');
    };

  }, []);

  const getAvator = async (uidArray) => {
    let mergeAvator =[];
    for(let i = 0; i < uidArray.length; i++) {
      try {
        let response;
        console.log('uidArray[i]',uidArray[i]);

        response = await getUserInfo({
          userId:uidArray[i]
        });
        let avator=[{avatarUrl:response.avatarUrl,uid:uidArray[i]}];
        console.log('avator',avator);
        console.log('mergeAvator',mergeAvator);
        mergeAvator=[...mergeAvator,...avator];
      } catch (error) {
        console.error('Error fetching gather list', error);
      }
    }
    setAvatorList(mergeAvator);

  };

  const getInfo = async (userId) => {
    try {
      let response;
      response = await getUserInfo({
        userId:userId
      });
      console.log('res',response);
      // 将接收到的数据存储到组件状态中
      setUserInfo(response);
      console.log('userInfo',userInfo);
      return response;
    } catch (error) {
      console.error('Error fetching gather list', error);
    }
  };
  const getMemberInfo = async (userId) => {
    try {
      let response;
      response = await getUserInfo({
        userId:userId
      });
      console.log('res',response);
      console.log('userInfo',userInfo);
      return response;
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
      goGather();
      //更改为已加入状态//todo
    } else if(res.code === 'A0400'){
      Taro.atMessage({
        message: res.message,
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
      goGather();
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
      goGather();
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

  const goGather = () => {
    Taro.switchTab({url:'/pages/gather/gather'})
  };
  const checkInfo = async(item) => {
    console.log('item',item);
    const info=await getMemberInfo(item.uid);
    openProfileModal(info);
    // Taro.switchTab({url:'/pages/gather/gather'})
  };
  const openProfileModal = (item) => {
    setSelectedProfile(item);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <View className='container'>
      <AtFloatLayout isOpened={showProfileModal} onClose={closeProfileModal} title="成员资料">
        {selectedProfile && (
          <View className='userInfo'>
            <Image
              mode='widthFix'
              src={selectedProfile.avatarUrl}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <View className='name'>{selectedProfile.nickname}</View>
            <View className='school'>{selectedProfile.school}</View>
            {/* 其他个人资料信息 */}
          </View>
        )}
      </AtFloatLayout>

      <View className="membersContainer">
        <View className="title">局内成员</View>
        <ScrollView
          scrollX
          style={{ whiteSpace: 'nowrap', overflowX: 'auto', height: '50px' }}
          className='avatar'
        >
          {avatorList.map((item, index) => (
            <View key={index} style={{ display: 'inline-block', marginLeft: '4vw' }} onClick={() => checkInfo(item)}>
              <Image
                mode='widthFix'
                src={item.avatarUrl}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
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
          <View className='time'>{createTime}</View>
        </View>
        <View className='detail'>
          <View className='title'>局情</View>
        <View className='content'>{gatherData?.description}</View>
        </View>
      </View>
      <View className='joinButton'>
        {isGather ? (
          isLeader ? (
            <><AtButton type='primary' circle onClick={handleQuit} className='buttonItem'>
              我要出局
            </AtButton><AtButton type='primary' circle onClick={handleDelete} className='buttonItem'>
                我要炸局
              </AtButton></>
          ) : (
            <AtButton type='primary' circle onClick={handleQuit} className='buttonItem'>
              我要出局
            </AtButton>
          )
        ) : (
          <AtButton type='primary' circle onClick={handleSubmit} className='buttonItem'>
            申请入局
          </AtButton>
        )}
        <AtMessage />
      </View>

    </View>
  );
}
