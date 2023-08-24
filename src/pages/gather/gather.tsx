import { View } from '@tarojs/components';
import { AtButton, AtTag,AtFab,AtIcon } from 'taro-ui';
import { useState } from 'react';

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import './gather.scss';



interface ClassificationItem {
  name: string;
  checked: boolean;
}

export default function Gather() {
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

  const tagClick = (index: number) => {
    if (classification[index].name === '空位') {
      const updatedClassification = classification.map((item, i) => ({
        ...item,
        checked: i === index ? !item.checked : item.checked,
      }));
      setClassification(updatedClassification);
    } else {
      const updatedClassification = classification.map((item, i) => ({
        ...item,
        checked: item.name === '空位' ? item.checked : (i === index ? !item.checked : false),
      }));
      setClassification(updatedClassification);
    }
  };

  const fixedButtonClick = () => {
    console.log('fixedButtonClick');
  };

  return (
    <View className='container'>
      <View className='fixed-button'>
        <AtFab onClick={() => fixedButtonClick()}>
          <AtIcon value='search' size='25' color='white'></AtIcon>
        </AtFab>
      </View>

      <View className='joinAndInitiate'>
        <AtButton className='join-button' type='primary' circle>
          我加入的局
        </AtButton>
        <AtButton className='initiate-button' type='primary' circle>
          发起攒局
        </AtButton>
      </View>
      <View className='tags'>
        {classification.map((item, index) => (
          <View
            className={`tag ${item.checked ? 'checked' : ''}`}
            key={index}
            onClick={() => tagClick(index)}
          >
            <AtTag
              className='tag-text'
              type='primary'
              circle
              active={item.checked}
            >
              {item.name}
            </AtTag>
          </View>
        ))}
      </View>
      <View className='cards'>
        <View className='card'>
          <View className='side'>
            <View>拼</View>
            <View>单</View>
          </View>
          <View className='content'></View>
        </View>
      </View>
    </View>
  );
}
