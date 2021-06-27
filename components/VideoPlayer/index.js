/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Animation from 'react-native-animatable';
import { translate } from 'i18n-js';
import { patch } from '../../utils/ApiRequest';
import { DEVICE } from '../../utils/constants';
import Typography from '../Typography';
import styles from './style';

const VideoComponent = ({
  videoInfo,
  videoTime,
  isAdmin,
  channelQueue,
  setVideoTime,
  channelId,
}) => {
  const playerRef = useRef(null);
  const [url, setUrl] = useState();
  const [ready, setReady] = useState(false);
  const [playerState, setPlayerState] = useState();
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoInfo && videoTime) {
        // console.log(playerRef.current);
        playerRef.current.getCurrentTime().then((current) => {
          setCurrentVideoTime(current);
          // console.log(videoInfo);
          if (current >= videoInfo.length - 2) {
            console.log('**** next video ****');
            setVideoTime({
              clockStartTime: videoTime.clockStartTime,
              queueStartPosition:
                videoTime.queueStartPosition === channelQueue.length - 1
                  ? 0
                  : videoTime.queueStartPosition + 1,
              status: 'Playing',
              videoStartTime: 0,
            });
          }
          // console.log(current);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [videoInfo, videoTime, ready, playerState]);

  const seekTo = (limit) => playerRef.current.seekTo(limit, true);

  useEffect(() => {
    if (videoTime && ready && playerState === 'playing') {
      seekTo(videoTime.videoStartTime);
      setReady(false);
    }
    if (videoInfo && videoInfo.videoInfo) {
      setUrl(videoInfo.videoInfo.url.split('=')[1]);
    }
    return () => setUrl(false);
  }, [videoTime, videoInfo, playerState, ready]);
  useEffect(() => {
    if (videoTime) {
      setReady(true);
    }
  }, [videoTime]);

  const transactions = (inverse) => ({
    [inverse ? 'to' : 'from']: {
      transform: [{ rotate: '0deg' }],
    },
    [inverse ? 'from' : 'to']: {
      transform: [{ rotate: '-90deg' }],
    },
  });

  const transactionInverse = {};

  return !videoInfo ? (
    <View style={styles.container}>
      <Typography type="h6" color="secondary">
        Nothing is Playing
      </Typography>
    </View>
  ) : (
    <>
      <View style={fullScreen && styles.fullScreenVideo}>
        <Animation.View
          animation={fullScreen ? transactions() : transactions(true)}
          duration={100}
          style={[styles.VideoContainer, fullScreen && styles.videoFullScreen]}
        >
          <YoutubePlayer
            ref={playerRef}
            videoId={url}
            height="100%"
            width={fullScreen ? '110%' : '100%'}
            play={videoTime.status === 'Playing'}
            webViewProps={{
              allowsFullscreenVideo: true,
              source:
                DEVICE.platform === 'android'
                  ? { baseUrl: 'https://youtube.com' }
                  : 'https://youtube.com',
            }}
            onReady={() => setReady(true)}
            onChangeState={(data) => {
              setPlayerState(data);
              if (isAdmin) {
                if (data === 'playing') {
                  console.log('*** playing ***');
                  patch
                    .playVideo(channelId, {
                      clockStartTime: videoTime.clockStartTime,
                      queueStartPosition: videoTime.queueStartPosition,
                      videoStartTime: currentVideoTime,
                    })
                    .then()
                    .catch((error) => console.log(error.response.data));
                }
                if (data === 'paused') {
                  console.log('*** paused ***');
                  patch
                    .pauseVideo(channelId, {
                      clockStartTime: videoTime.clockStartTime,
                      queueStartPosition: videoTime.queueStartPosition,
                      videoStartTime: currentVideoTime,
                    })
                    .then((res) => console.log(res.data))
                    .catch((error) => console.log(error.response.data));
                }
              }
            }}
            // onFullScreenChange={(e) => console.log(e)}
            // return true or false
            // mute true or false
            // volume={10} from 0 - 100
            // initialPlayerParams={{
            //   preventFullScreen: false,
            //   // start: 5,
            //   rel: false,
            //   showClosedCaptions: false,
            // }}

            onError={(error) => console.log(error)}
          />
          {!isAdmin && (
            <TouchableOpacity
              onPress={() =>
                playerState === 'playing' && setFullScreen(!fullScreen)
              }
              style={styles.blockControl}
            />
          )}
        </Animation.View>
      </View>
    </>
  );
};

export default VideoComponent;
