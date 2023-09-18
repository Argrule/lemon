import { View } from '@tarojs/components';
import { AtProgress } from 'taro-ui';
import { useState,useEffect } from 'react';

import { getTeamList,getTagList } from "$/api/gather";

import Taro from "@tarojs/taro";

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/progress.scss"
import './joinedGather.scss';



interface ClassificationItem {
  name: string;
  checked: boolean;
}
interface GatherItemType {
  maxNum: number;
  id: number;
  description: string;
  currentNum: number;
  tagName: string[] | null; // 根据实际情况调整，这里假设是一个字符串数组或者可能为空
  topic: string;
  uid: number;
  createTime: string;
  // 其他可能的属性
}

export default function Gather() {
  const [selectedTagIndex, setSelectedTagIndex] = useState<number>(0);
  const [gatherList, setGatherList] = useState<GatherItemType[]>([]); // 初始化为空数组
  const [classification, setClassification] = useState<ClassificationItem[]>([
    { name: '空位', checked: false },
    { name: '自习', checked: false },
    { name: '电影', checked: false },
    { name: '聚餐', checked: false },
    { name: '拼车', checked: false },
    { name: '拼单', checked: false },
    { name: '运动', checked: false },
    { name: '游戏', checked: false },
    { name: '旅行', checked: false },
    { name: '其他', checked: false },
  ]);


  useEffect(() => {
    getTagList({});
    fetchGatherList(0)

  }, []);

  // 使用 usePullDownRefresh 钩子来处理下拉刷新
  Taro.usePullDownRefresh(() => {
    refreshData();
  });

  const refreshData = () => {
    // 在这里触发下拉刷新
    fetchGatherList(selectedTagIndex);
  };

  const fetchGatherList = async (tagId) => {
    try {
      let response;
      if(tagId){
        response = await getTeamList({
          pageNum: 1,
          pageSize: 30
        });
      } else {
        response = await getTeamList({
          pageNum: 1,
          pageSize: 30
        });
      }


      console.log('res',response);
      for (let item of response.list) {
        console.log(item.tagName);
        if (item.tagName) {
          item.tagName = item.tagName.split('');
        }
      }
      console.log('res',response.list);

      // Assuming the response contains the list of gathers
      setGatherList(response.list); // Update the gatherList state
      Taro.stopPullDownRefresh(); // 始终在请求结束后停止下拉刷新动画
    } catch (error) {
      console.error('Error fetching gather list', error);
      Taro.stopPullDownRefresh(); // 始终在请求结束后停止下拉刷新动画
    }
  };

  const tagClick = (index: number) => {
    if (classification[index].name === '空位') {
      const updatedClassification = classification.map((item, i) => ({
        ...item,
        checked: i === index ? !item.checked : item.checked,
      }));
      setClassification(updatedClassification);
      console.log('index',index);
      setSelectedTagIndex(index); // 更新选中的标签索引
      fetchGatherList(index); // 重新获取数据
    } else {
      const updatedClassification = classification.map((item, i) => ({
        ...item,
        checked: item.name === '空位' ? item.checked : (i === index ? !item.checked : false),
      }));
      setClassification(updatedClassification);
      console.log('index',index);
      setSelectedTagIndex(index); // 更新选中的标签索引
      fetchGatherList(index); // 重新获取数据
    }

  };

  const cardClick = (gather) => {
    console.log('gather',gather);
    // Taro.navigateTo({url:'/pages/gather/gatherDetail/gatherDetail'})
    Taro.navigateTo({
      url: '/pages/gather/gatherDetail/gatherDetail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { gather: gather,isJoined: true,isLeader:true });
      }
    })
  };


  return (
    <View className='container'>
      <View className='cards'>
          {gatherList.map((gather, index) => (
            <View className='card' key={index} onClick={() => cardClick(gather)}>
              <View className='side'>
                <View>{gather.tagName?gather.tagName[0]:''}</View>
                <View>{gather.tagName?gather.tagName[1]:''}</View>
              </View>
              <View className='text'>
                <View className='content'>
                  <View className='description'>
                    {gather.topic}
                  </View>
                  <View className='others'>
                    <View className='director'>局长：{gather.nickname}</View>
                    <View className='time'>{gather.createTime}</View>
                  </View>

                </View>
                <View className='schedule'>
                    <AtProgress percent={Math.floor(gather.currentNum*100/gather.maxNum)} />
                  </View>
              </View>

            </View>
          ))}

      </View>
    </View>
  );
}
