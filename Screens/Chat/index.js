/* eslint-disable react/no-children-prop */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, BackHandler } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import ChatComponent from './chatComponent';
import styles from './style';
import ChatHeader from './ChatHeader';
import AuthContext from '../../utils/AuthContext';
import { Video, BottomSheet, Loading } from '../../components';
import AddNewVideos from '../../components/Playlist/AddNewVideos';
import { Delete, get } from '../../utils/ApiRequest';
import {
  calculatePlayerStatus,
  defaultPlayerStatus,
} from '../../utils/helperFunction';
import { WS_EVENTS } from '../../utils/constants';

const Chat = ({ navigation, route, data }) => {
  const { channelId, avatar, username } = route.params;
  const [isOpen, setOpen] = useState(false);
  const {
    onlineFriends,
    socketMessageType,
    socketPayload,
    setSocketPayload,
    userData,
  } = useContext(AuthContext);
  const [channelData, setChannelData] = useState();
  const [searchVideos, setSearchVideos] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [isStop, setStop] = useState(false);
  const isFocus = useIsFocused();

  const getChannelData = async () =>
    get
      .getChannel(channelId)
      .then(({ data: { channel } }) => {
        const startPlayerStatus = channel
          ? {
              videoStartTime: channel.videoStartTime,
              queueStartPosition: channel.queueStartPosition,
              clockStartTime: channel.clockStartTime,
              status: channel.status,
            }
          : defaultPlayerStatus();
        const playlist = channel.queue;
        setVideoTime(calculatePlayerStatus(startPlayerStatus, playlist));
        setChannelData(channel);
      })
      .catch((error) => console.log(error));

  useEffect(() => {
    getChannelData().then(() => {
      if (
        (socketMessageType === WS_EVENTS.CHANNEL.UPDATE_CHANNEL ||
          socketMessageType === WS_EVENTS.VIDEO_CONTROL.ADD_VIDEO) &&
        socketPayload
      ) {
        const playlist = channelData.queue;
        if (socketPayload.channelId === channelId) {
          if (socketMessageType === WS_EVENTS.VIDEO_CONTROL.ADD_VIDEO) {
            setChannelData((oldData) => ({
              ...oldData,
              queue: [
                ...oldData.queue,
                {
                  id: socketPayload.video.id,
                  channelId,
                  videoId: socketPayload.video.videoId,
                  length: socketPayload.video.length,
                  videoInfo: {
                    title: socketPayload.video.title,
                    publishedAt: socketPayload.video.publishedAt,
                    thumbnail: socketPayload.video.thumbnail,
                    url: socketPayload.video.url,
                  },
                  title: socketPayload.video.title,
                  publishedAt: socketPayload.video.publishedAt,
                  thumbnail: socketPayload.video.thumbnail,
                  url: socketPayload.video.url,
                },
              ],
            }));
          }
          setVideoTime(
            calculatePlayerStatus(socketPayload.updatedChannel, playlist)
          );
          setSocketPayload();
        }
      }
    });
  }, [socketPayload]);

  const onPressDeleteVD = async (vdId) =>
    Delete.deleteVideo(vdId, channelId).then(getChannelData).catch(console.log);

  useEffect(() => {
    if (isFocus) {
      setStop(false);
    } else {
      setStop(true);
    }
  }, [isFocus]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => setStop(true);

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <>
      {!isStop && (
        <View style={styles.containerStyle}>
          <ChatHeader
            isOpen={isOpen}
            setOpen={setOpen}
            navigation={navigation}
            data={data}
            avatar={avatar}
            username={username}
            isOnline={
              onlineFriends.length > 0 && onlineFriends.includes(channelId)
            }
            channelData={channelData && channelData}
            setAddVideo={setSearchVideos}
            onPressDeleteVD={onPressDeleteVD}
            refreshChat={getChannelData}
          />

          <Loading
            show={!channelData && !videoTime.queueStartPosition}
            style={{ marginTop: '-10%' }}
          />
          {channelData && channelData.queue.length > 0 && (
            <>
              <View style={{ height: 200 }}>
                <Video
                  channelId={channelId}
                  videoInfo={
                    channelData &&
                    channelData.queue.length > 0 &&
                    channelData.queue[videoTime.queueStartPosition]
                  }
                  videoTime={videoTime}
                  isAdmin
                  channelQueue={channelData && channelData.queue}
                  setVideoTime={setVideoTime}
                />
              </View>
            </>
          )}
          <ChatComponent channelId={channelId} />
        </View>
      )}
      <BottomSheet
        closeInside
        responsive
        open={searchVideos}
        setActive={setSearchVideos}
        children={
          <AddNewVideos channelId={channelId} refresh={getChannelData} />
        }
      />
    </>
  );
};

export default Chat;
