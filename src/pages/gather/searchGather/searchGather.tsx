import { View } from '@tarojs/components';
import { AtProgress,AtMessage,AtSearchBar } from 'taro-ui';
import { useState,useEffect } from 'react';

import { searchTeamList } from "$/api/gather";

import Taro from "@tarojs/taro";

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/progress.scss"
import "taro-ui/dist/style/components/search-bar.scss";
import './searchGather.scss';



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
  const [title, setTitle] = useState<string>('');
  const [gatherList, setGatherList] = useState<GatherItemType[]>([]); // 初始化为空数组
  const [pageNum, setPageNum] = useState<number>(1);

  useEffect(() => {

  }, []);

  const searchGather = async (value) => {
    console.log('value',value);

    console.log('title',title);

    try {
      let response;
      console.log('进了上面');
      response = await searchTeamList({
        pageNum: pageNum,
        topic: title
      });
      console.log('res',response);
      for (let item of response.list) {
        console.log(item.tagName);
        if (item.tagName) {
          item.tagName = item.tagName.split('');
        }
      }
      console.log('res',response.list);

      if(pageNum===1){
        setGatherList(response.list); // Update the gatherList state
      } else if(pageNum>1){
        console.log('response.list',response.list);
        if(response.list.length==0){
          Taro.atMessage({
            message: '没有更多数据了',
            type: 'error',
          });
        }
        setGatherList([...gatherList,...response.list]);

      }
      // Assuming the response contains the list of gathers

    } catch (error) {
      console.error('Error fetching gather list', error);
    }
  };

  const cardClick = (gather) => {
    console.log('gather',gather);
    // Taro.navigateTo({url:'/pages/gather/gatherDetail/gatherDetail'})
    Taro.navigateTo({
      url: '/pages/gather/gatherDetail/gatherDetail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { gather: gather })
      }
    })
  };



  return (
    <View className='container'>
      <View className='searchBar'>
        <AtSearchBar
          value={title}
          onChange={(value) => setTitle(value)}
          onActionClick={() => searchGather(title)} // 在这里调用 searchGather 方法
        />
      </View>
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
                    <View className='director'>局长：{gather.uid}</View>
                    <View className='time'>{gather.createTime}</View>
                  </View>

                </View>
                <View className='schedule'>
                    <AtProgress percent={Math.floor(gather.currentNum*100/gather.maxNum)} />
                  </View>
              </View>

            </View>
          ))}
        <AtMessage />
      </View>
    </View>
  );
}
