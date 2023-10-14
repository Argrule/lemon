import { View,Image } from '@tarojs/components';
import { AtButton, AtTag,AtFab,AtIcon,AtProgress,AtMessage } from 'taro-ui';
import { useState,useEffect,} from 'react';

import { getGatherList,getTagList,getCount } from "$/api/gather";

import Taro, { useDidShow } from "@tarojs/taro";

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/progress.scss"
import './gather.scss';



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
  const [count, setCount] = useState<number>(0);
  const [gatherList, setGatherList] = useState<GatherItemType[]>([]); // 初始化为空数组
  const [classification, setClassification] = useState<ClassificationItem[]>([
    { name: '全部', checked: false },
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
  const [pageNum, setPageNum] = useState<number>(1);

  useEffect(() => {
    getTagList({});
    fetchGatherList(0,1)
    getNum()

  }, []);
  useDidShow(() => {
    setPageNum(1);
    fetchGatherList(0,1);
    const updatedClassification = classification.map((item, i) => ({
      ...item,
      checked: false,
    }));
    setClassification(updatedClassification);
  });

  Taro.useReachBottom(() => {
    onReachBottom();
  });
  /**
   * @description 触底加载更多
   */
  const onReachBottom=async() =>{
    setPageNum(pageNum+1);
    console.log("触底了",pageNum);
    const res=await fetchGatherList(0)
    console.log('res',res);

  }
  // 使用 usePullDownRefresh 钩子来处理下拉刷新
  Taro.usePullDownRefresh(() => {
    refreshData();
  });

  const refreshData = () => {
    // 在这里触发下拉刷新
    fetchGatherList(0,1);
  };

  const getNum = async () => {

    try {
      let response;

        response = await getCount({
        });
        console.log('getNum',response);


        setCount(response.totalNum); // Update the gatherList state

    } catch (error) {
      console.error('Error fetching gather list', error);
    }
  };

  const fetchGatherList = async (tagId,initPageNum) => {
    console.log('tagId',tagId);

    try {
      let response;
      if(initPageNum){
        console.log('进了上面');
        response = await getGatherList({
          pageNum: initPageNum,
          tagId: tagId
        });
        console.log('res',response);

        console.log('response.list',response.list);
        // 创建一个映射对象，将 tagname 映射到 tagid 的关系
        const tagnameToTagidMap = {
          '全部': 0,
          '自习': 1,
          '电影': 2,
          '聚餐': 3,
          '拼车': 4,
          '拼单': 5,
          '运动': 6,
          '游戏': 7,
          '旅行': 8,
          '其他': 9,
        };

        // 使用 map 函数遍历数组并为每个对象添加 tagid 属性
        const newData = response.list.map(item => {
          const tagname = item.tagName;
          const tagid = tagnameToTagidMap[tagname];
          return { ...item, tagid };
        });

        for (let item of newData) {
          console.log(item.tagName);
          if (item.tagName) {
            item.tagName = item.tagName.split('');
          }
        }

        // 新的数组 newData 包含了每个对象的 tagid 属性
        console.log('newData',newData);

        setGatherList(newData); // Update the gatherList state
      } else {
        console.log('进了下面');
        response = await getGatherList({
          pageNum: pageNum,
          tagId: tagId
        });
          // 创建一个映射对象，将 tagname 映射到 tagid 的关系
          const tagnameToTagidMap = {
            '全部': 0,
            '自习': 1,
            '电影': 2,
            '聚餐': 3,
            '拼车': 4,
            '拼单': 5,
            '运动': 6,
            '游戏': 7,
            '旅行': 8,
            '其他': 9,
          };

          // 使用 map 函数遍历数组并为每个对象添加 tagid 属性
          const newData = response.list.map(item => {
            const tagname = item.tagName;
            const tagid = tagnameToTagidMap[tagname];
            return { ...item, tagid };
          });

          for (let item of newData) {
            console.log(item.tagName);
            if (item.tagName) {
              item.tagName = item.tagName.split('');
            }
          }

          // 新的数组 newData 包含了每个对象的 tagid 属性
          console.log('newData',newData);
        if(pageNum===1){
          setGatherList(newData); // Update the gatherList state
        } else if(pageNum>1){
          console.log('response.list',newData);
          if(newData.length==0){
            // @ts-ignore
            Taro.atMessage({
              message: '没有更多数据了',
              type: 'error',
            });
          }
          setGatherList([...gatherList,...newData]);

        }
      }

      // Assuming the response contains the list of gathers

      Taro.stopPullDownRefresh(); // 始终在请求结束后停止下拉刷新动画
    } catch (error) {
      console.error('Error fetching gather list', error);
      Taro.stopPullDownRefresh(); // 始终在请求结束后停止下拉刷新动画
    }
  };

  const tagClick = (index: number) => {
    setPageNum(1);
    if (classification[index].name === '空位') {
      const updatedClassification = classification.map((item, i) => ({
        ...item,
        checked: i === index ? !item.checked : item.checked,
      }));
      setClassification(updatedClassification);
      console.log('index空位',index);
      setSelectedTagIndex(index); // 更新选中的标签索引
      fetchGatherList(index,1); // 重新获取数据

    } else {
      const updatedClassification = classification.map((item, i) => ({
        ...item,
        checked: item.name === '空位' ? item.checked : (i === index ? !item.checked : false),
      }));
      setClassification(updatedClassification);
      console.log('index非空位',index);
      setSelectedTagIndex(index); // 更新选中的标签索引
      fetchGatherList(index,1); // 重新获取数据


    }

  };

  const cardClick = (gather) => {
    console.log('gather',gather);
    // Taro.navigateTo({url:'/pages/gather/gatherDetail/gatherDetail'})
    Taro.navigateTo({
      url: '/pages/gather/gatherDetail/gatherDetail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { gather: gather,isJoined:false })
      }
    })
  };

  const fixedButtonClick = () => {
    Taro.navigateTo({url:'/pages/gather/searchGather/searchGather'})
  };

  const goCreateGather = () => {
    Taro.navigateTo({url:'/pages/gather/createGather/createGather'})
  };

  const goJoinedGather = () => {
    Taro.navigateTo({url:'/pages/gather/joinedGather/joinedGather'})
  };


  return (
    <View className='container'>


      {/* <View className='fixed-button'>
        <AtFab onClick={() => fixedButtonClick()}>
          <AtIcon value='search' size='25' color='white'></AtIcon>
        </AtFab>
      </View> */}
      <View style={{ display: 'flex', alignItems: 'center',justifyContent:'flex-start',width:'96%',marginBottom:'1vh' }}>
        <View className='little'>
          已攒
        </View>
        <View className='big'>
            {count}
        </View>
        <View className='little'>
          人
        </View>
      </View>
      {/* <View className='imgContainer'> */}
        <Image src={require('../../assets/简洁.png')} style={{ width: '95vw', height: '18vh' }}/>
      {/* </View> */}
      <View className='joinAndInitiate'>
        <AtButton className='join-button' type='primary' circle onClick={goJoinedGather}>
          我加入的局
        </AtButton>
        <AtButton className='initiate-button' type='primary' circle onClick={goCreateGather}>
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
          {gatherList.map((gather, index) => (
            <View className='card' key={index} onClick={() => cardClick(gather)}>
              <View className={`${'side' + gather.tagid}`}>
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
                {/* <View className='schedule'>
                    <AtProgress percent={Math.floor(gather.currentNum*100/gather.maxNum)} />
                  </View> */}
              </View>

            </View>
          ))}
        <AtMessage />
      </View>
    </View>
  );
}
