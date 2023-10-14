import { View, Image, ScrollView,Input,Button } from '@tarojs/components';
import { Textarea } from "@tarojs/components";
import { AtButton,AtMessage,AtFloatLayout,AtIcon } from 'taro-ui';
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import { useState,useEffect,useRef } from 'react';
import { FormatTimeFromNow } from "$/utils/dayjs";



// import { getGatherList,getTagList } from "$/api/gather";
import { joinGather,quitGather,deleteGather,getUserInfo,getComment,publishComment} from "$/api/gather";
import Taro, { useDidShow } from "@tarojs/taro";

// import request from '$/utils/request'

import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/tag.scss';
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/progress.scss"
import "taro-ui/dist/style/components/float-layout.scss";
import "taro-ui/dist/style/components/icon.scss";
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
  const [commentList, setCommentList] = useState([]);

  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [isInputDialogOpen, setIsInputDialogOpen] = useState<boolean>(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] =
    useState<boolean>(false);
  const [placeholderStr, setPlaceholderStr] = useState("在此输入公开讨论的内容");
  const [replyToPerson, setReplyToPerson] = useState<string>("");

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
      getCommentList(data.gather.id)
    });


    // 返回函数用于清除监听器，以避免内存泄漏
    return () => {
      eventChannel.off('acceptDataFromOpenerPage');
    };

  }, []);

  function scrollToBottom() {
    // 获取页面高度
    Taro.createSelectorQuery()
      .selectViewport()
      .scrollOffset((res) => {
        const scrollTop = res.scrollTop;
        console.log(scrollTop);
        // 设置滚动位置为页面底部
        Taro.pageScrollTo({
          scrollTop: 100000, // 10000 是一个足够大的值，确保能滚动到页面底部
          duration: 300, // 滚动持续时间
        });
      })
      .exec();
  }
  const handleInputBlur = (nickname: string, id?: number) => {
    scrollToBottom();
    // 打开输入框
    switch (id) {
      case undefined:
        // ## 还没拿到 用户名
        setPlaceholderStr("在此输入公开讨论内容");
        setReplyToPerson(nickname);
        setIsCommentDialogOpen(true);
        break;

      default:
        setPlaceholderStr("发送你的回复哦~");
        CommentIdMark.current = id;
        setReplyToPerson(nickname);
        setIsInputDialogOpen(true);
        break;
    }
  };
  const handleNewCommentChange = (e: any) => {
    setNewCommentContent(e.target.value);
  };
  const handleNewCommentSubmit = async () => {
    if (!newCommentContent) {
      console.log("请输入评论内容");
      //@ts-ignore
      Taro.atMessage({
        message: "请输入评论内容",
        type: "error",
        duration: 800,
      });
      return;
    }
    console.log('gatherData',gatherData);

    const res = await publishComment({
      teamId: gatherData.id,
      content: newCommentContent,
    });
    if (res.code != "00000") {
      console.log("发布评论失败");
      return;
    }
    setNewCommentContent("");

    // 直接重新获取评论列表
    getCommentList(gatherData.id)
    // setCommentList(res2.data.list);
    // 关闭输入弹窗
    setIsCommentDialogOpen(false);

    //不触发全部重新获取,需要后端返回新评论的数据
    // post.current = post.current;
    // const newComment: Comment = {
    //   id: 0,
    //   uid: 0,
    //   postId: 0,
    //   content: newCommentContent,
    //   createTime: "",
    // };
    // setCommentList([newComment, ...commentsList]);
  };
  const getCommentList = async (teamId) => {
    try {
      let response;
      response = await getComment({
        teamId:teamId
      });
      console.log('commentList',response.list);
      // 将接收到的数据存储到组件状态中
      setCommentList(response.list);
      console.log('commentList',commentList);
      // return response.list;
    } catch (error) {
      console.error('Error fetching gather list', error);
    }
  };
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
      setTimeout(() => {
        goGather();
      }, 2000);

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
      setTimeout(() => {
        goGather();
      }, 2000);

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
      setTimeout(() => {
        goGather();
      }, 2000);
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
          <View>
            <View className='name'>{userInfo?.nickname}</View>
            <View className='time'>{FormatTimeFromNow(createTime)}</View>
          </View>

        </View>
        <View className='detail'>
          <View className='title'>局情</View>
          <View className='content'>{gatherData?.description}</View>
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
                我想去
              </AtButton>
            )}
            <AtMessage />
          </View>
          <View className='shareButton'>
            <AtButton type='primary' circle >
              <AtIcon value='external-link' size='20' color='white'></AtIcon>
            </AtButton>
          </View>
        </View>

      </View>
      <View className='commentContainer'>

          <View className='title'>公开讨论</View>
          <View className='content'>
            {commentList.map((comment, index) => (
              <View className='commentItem'>
                <View className='commentorInfo'>
                  <View className='avatar'>
                    <Image
                      mode='widthFix'
                      src={comment?.avatarUrl}
                      style='width: 40px; height: 50px; border-radius: 50%;margin-left: 2vw; margin-right: 2vw'
                    />
                  </View>
                  <View>
                    <View className='commentName'>{comment?.nickname}</View>
                    <View className='time'>{FormatTimeFromNow(comment?.createTime)}</View>
                  </View>

                </View>
                <View className='commentContent'>{comment?.content}</View>
              </View>
            ))}
          </View>

      </View>

      {/* 用于输入评论 */}
      <AtActionSheet
        isOpened={isCommentDialogOpen}
        className="input-container"
        onClose={() => setIsCommentDialogOpen(false)}
      >
        <Textarea
          value={newCommentContent}
          maxlength={200}
          placeholder={`评论 @${replyToPerson}`}
          className="textarea"
          onInput={handleNewCommentChange}
          style="min-height:200rpx"
          cursor-spacing={150}
          show-confirm-bar={false}
          autoHeight
        />
        <AtActionSheetItem>
          <View className="rely-main">
            {/* <Button
              className="rely-btn"
              onClick={() => setIsCommentDialogOpen(false)}
            >
              预留其他功能
            </Button> */}
            <Button className="rely-btn" onClick={handleNewCommentSubmit}>
              发布评论
            </Button>
          </View>
        </AtActionSheetItem>
      </AtActionSheet>
      {/* 评论输入区域 */}
      <View className="new-post">
        <Input
          value={newCommentContent}
          disabled
          onClick={() => handleInputBlur(gatherData.nickname)}
          onInput={handleNewCommentChange}
          placeholder={placeholderStr}
        />
        <Button onClick={handleNewCommentSubmit}>发布</Button>
      </View>
    </View>
  );
}
