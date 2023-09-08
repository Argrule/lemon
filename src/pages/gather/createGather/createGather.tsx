import { View, Textarea } from '@tarojs/components';
import { AtButton, AtTag,AtInput,AtMessage } from 'taro-ui';
import { useState } from 'react';

import { createGather } from "$/api/gather";

import Taro from "@tarojs/taro";

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/progress.scss"
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/textarea.scss";

import './createGather.scss';


interface ClassificationItem {
  name: string;
  checked: boolean;
}
interface GatherData {
  tagId: number;
  maxNum: number;
  description: string;
  topic: string;
}

export default function Gather() {
  const initialGatherData: GatherData = {
    tagId: 0,
    maxNum: NaN,
    description: '',
    topic: '',
  };
  const initialClassification: ClassificationItem[] = [
    { name: '自习', checked: false },
    { name: '电影', checked: false },
    { name: '聚餐', checked: false },
    { name: '拼车', checked: false },
    { name: '拼单', checked: false },
    { name: '运动', checked: false },
    { name: '游戏', checked: false },
    { name: '旅行', checked: false },
    { name: '其他', checked: false },
  ];
  const [gatherData, setGatherData] = useState<GatherData>({
    tagId: 0,
    maxNum: NaN,
    description: '',
    topic: '',
  });

  const [classification, setClassification] = useState<ClassificationItem[]>([
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

  const tagClick = (name: number) => {
    const updatedClassification = classification.map((item, index) => ({
      ...item,
      checked: index == name,
    }));
    setClassification(updatedClassification);
    setGatherData({ ...gatherData, tagId: name + 1 });
  };

  const handleSubmit = async () => {
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    if (!gatherData.topic || !gatherData.description || isNaN(gatherData.maxNum) || gatherData.maxNum <= 0) {
      // @ts-ignore
      Taro.atMessage({
        message: '请填写完整的攒局信息并确保总人数大于0。',
        type: 'error',
      });
      return;
    }

    const res = await createGather(gatherData);

    if (res.code === '00000') {
      // @ts-ignore
      Taro.atMessage({
        message: '创建成功',
        type: 'success',
      });
      // 重置状态为初始值
      setGatherData(initialGatherData);
      setClassification(initialClassification);
      goGather()
    } else {
      // @ts-ignore
      Taro.atMessage({
        message: '创建失败',
        type: 'error',
      });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setGatherData({ ...gatherData, description: value });
  };

  const goGather = () => {
    Taro.switchTab({url:'/pages/gather/gather'})
  };

  return (
    <View className='container'>
      <View className='tagContainer'>
        <View className='title'>攒局类别</View>
        <View className='tags'>
          {classification.map((item, index) => (
            <View className='tag' key={index}>
              <AtTag
                name={index.toString()}
                active={item.checked}
                circle
                onClick={() => tagClick(index)}
              >
                {item.name}
              </AtTag>
            </View>
          ))}
        </View>
      </View>
      <View className='titleContainer'>
        <View className='title'>攒局主题</View>
        <View className='inputTitle'>
          <View className='inputNormal'>
            <AtInput
              value={gatherData.topic}
              placeholder='请输入内容'
              onChange={(value) => setGatherData({ ...gatherData, topic: value })} name='topic'
            />
          </View>
        </View>
      </View>

      <View className='detailContainer'>
        <View className='title'>攒局详情</View>
        <View className='inputDetail'>
          <View className='inputNormal'>
                  <Textarea
                    value={gatherData.description}
                    maxlength={200}
                    placeholder='在此输入攒局详情，例如时间、地点和攒局内容'
                    className='textarea'
                    onInput={(e) => handleDescriptionChange(e.detail.value)}
                    style='min-height:200rpx'
                    autoHeight
                  />
          </View>
        </View>
      </View>

      <View className='numContainer'>
        <View className='title'>总人数</View>
        <View className='inputNum'>
          <View className='inputNormal'>
            <AtInput
              value={gatherData.maxNum}
              placeholder='请输入总人数'
              onChange={(value) => setGatherData({ ...gatherData, maxNum: value })} name='maxNum'
            />
          </View>
        </View>
      </View>

      <View className='bottonContainer'>
        <View className='botton'>
          <AtButton type='primary' onClick={handleSubmit}>
            提交
          </AtButton>
          <AtMessage />
        </View>
      </View>
    </View>
  );
}
