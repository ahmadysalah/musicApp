/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animation from 'react-native-animatable';
import { get } from '../../utils/ApiRequest';
import { ChannelHeader, PlayList, Video } from '../../components';
import ChannelDescription from './ChannelDescription';
import SocialCenter from './SocialCenter';
import { GetFromStore } from '../../utils/AsyncStorage';
import ChannelSettings from './ChannelSettings';
import styles from './style';
import ChannelTabs from '../../components/ChannelTabs';
import VideoDescription from '../../components/VideoDescription';
import AddNewVideos from '../../components/Playlist/AddNewVideos';
import ChatComponent from '../Chat/chatComponent';
import {
  calculatePlayerStatus,
  defaultPlayerStatus,
} from '../../utils/helperFunction';
import { DEVICE, WS_EVENTS } from '../../utils/constants';
import AuthContext from '../../utils/AuthContext';

const Channel = ({ navigation, route }) => {
  const [channelId] = useState(route.params.channelId);
  const [videoInfo, setVideoInfo] = useState(route.params.VideoDetails);
  const [channelData, setChannelData] = useState();
  const [menu, setMenu] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewers, setViewers] = useState();
  const [url, setUrl] = useState();
  const [tab, setTab] = useState('channel');
  const [videoTime, setVideoTime] = useState({});
  const [videoIndex, setVideoIndex] = useState();
  const [showHeader, setShowHeader] = useState({ slide: 'up', num: 0 });
  // const [menuRef] = useRef();
  const {
    socketMessageType,
    socketPayload,
    setSocketPayload,
    userData,
  } = useContext(AuthContext);

  const handleScroll = ({ nativeEvent: { contentOffset } }) => {
    if (
      (showHeader.num < contentOffset.y && showHeader.slide === 'up') ||
      contentOffset.y === 0
    ) {
      setShowHeader({
        slide: contentOffset.y === 0 ? 'up' : 'down',
        num: contentOffset.y,
      });
    }
  };

  const refreshChannel = async () => {
    get
      .getChannel(channelId)
      .then(async ({ data, data: { channel } }) => {
        const { id } = await GetFromStore('userData');
        data.channel.admins.map((userId) => {
          userId === id && setIsAdmin(true);
          return null;
        });

        const startPlayerStatus = channel
          ? {
              videoStartTime: channel.videoStartTime,
              queueStartPosition: videoIndex || channel.queueStartPosition,
              clockStartTime: channel.clockStartTime,
              status: videoIndex ? 'Playing' : channel.status,
            }
          : defaultPlayerStatus();
        const playlist = channel.queue;
        setVideoTime(calculatePlayerStatus(startPlayerStatus, playlist));
        setChannelData(data);
        const channelViewers = await get.getUsersFromArray(
          data.channel.viewers
        );
        setViewers(channelViewers);
      })
      .catch((error) => console.log({ error: error.data }));
  };
  useEffect(() => {
    refreshChannel().then();
    return () => false;
  }, []);

  useEffect(() => {
    if (
      (socketMessageType === WS_EVENTS.CHANNEL.UPDATE_CHANNEL ||
        socketMessageType === WS_EVENTS.VIDEO_CONTROL.ADD_VIDEO) &&
      socketPayload
    ) {
      const playlist = channelData?.channel?.queue;
      if (socketPayload.channelId === channelId) {
        if (socketMessageType === WS_EVENTS.VIDEO_CONTROL.ADD_VIDEO) {
          setChannelData((oldData) => ({
            ...oldData,
            channel: {
              ...oldData.channel,
              queue: [
                ...oldData.channel.queue,
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
            },
          }));
        }
        setVideoInfo({
          videoInfo:
            channelData?.channel?.queue[
              socketPayload.updatedChannel.queueStartPosition
            ],
          viewers: Object.values(channelData?.users).slice(0, 15),
          viewersNumber: channelData?.channel?.viewers.length,
        });

        setVideoTime(
          calculatePlayerStatus(socketPayload.updatedChannel, playlist)
        );
        setSocketPayload();
      }
    }
  }, [socketPayload]);

  useEffect(() => {
    if (videoInfo && videoInfo.videoInfo)
      setUrl(videoInfo.videoInfo.url.split('=')[1]);
    return () => setUrl(false);
  }, [videoInfo]);
  return (
    <>
      <ChannelHeader
        navigation={navigation}
        menu={menu}
        setMenu={setMenu}
        avatar={channelData?.channel.icon}
        ChannelName={channelData?.channel.name}
        isAdmin={isAdmin}
      />

      {menu === 2 ? (
        <ChannelSettings
          channelId={channelId}
          navigation={navigation}
          channel={channelData?.channel}
          refreshChannel={refreshChannel}
        />
      ) : (
        <>
          <Animation.View
            transition="translateY"
            duration={100}
            style={{
              height: '100%',
              transform: [
                {
                  translateY:
                    showHeader.slide === 'down' || tab === 'chat'
                      ? -DEVICE.heightP(13)
                      : 0,
                },
              ],
            }}
          >
            <Video
              channelId={channelId}
              videoInfo={
                channelData && {
                  ...videoInfo,
                  ...channelData.channel.queue[
                    videoIndex || videoTime.queueStartPosition
                  ],
                }
              }
              videoTime={videoTime}
              setVideoTime={setVideoTime}
              isAdmin={channelData?.channel?.admins.includes(userData.id)}
              channelQueue={channelData?.channel?.queue}
            />
            <View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                // scrollEnabled={tab !== 'playlist'}
              >
                {tab === 'channel' && (
                  <VideoDescription
                    videoInfo={
                      channelData && {
                        ...videoInfo,
                        ...channelData.channel.queue[
                          videoIndex || videoTime.queueStartPosition
                        ],
                      }
                    }
                    url={url}
                    viewers={viewers}
                  />
                )}

                <ChannelTabs
                  isAdmin={isAdmin}
                  tab={tab}
                  channelTabPressed={() => setTab('channel')}
                  chatTabPressed={() => setTab('chat')}
                  searchTabPressed={() => setTab('search')}
                  playlistTabPressed={() => {
                    tab === 'playlist' && refreshChannel().then();
                    setTab('playlist');
                  }}
                />
                {tab === 'search' && (
                  <AddNewVideos
                    channelId={channelId}
                    refresh={refreshChannel}
                  />
                )}
                {tab === 'playlist' && (
                  <PlayList
                    data={channelData?.channel?.queue}
                    videoTime={videoTime}
                    isAdmin={isAdmin}
                    tab={tab}
                    style={styles.container}
                    refreshChannel={refreshChannel}
                    channelId={channelId}
                    setVideoIndex={setVideoIndex}
                  />
                )}

                {tab === 'channel' && channelData && (
                  <>
                    <View style={styles.container}>
                      <PlayList
                        data={channelData?.channel?.queue}
                        videoTime={videoTime}
                        isAdmin={isAdmin}
                        tab={tab}
                        refreshChannel={refreshChannel}
                        channelId={channelId}
                        setVideoIndex={setVideoIndex}
                      />
                      <ChannelDescription
                        channel={channelData?.channel}
                        isMember={channelData.isMember}
                        refreshChannel={refreshChannel}
                      />
                    </View>
                    <SocialCenter
                      social={channelData}
                      isAdmin={isAdmin}
                      refreshChannel={refreshChannel}
                    />
                  </>
                )}
              </ScrollView>
            </View>
            {tab === 'chat' && <ChatComponent channelId={channelId} />}
          </Animation.View>
        </>
      )}
    </>
  );
};

export default Channel;
