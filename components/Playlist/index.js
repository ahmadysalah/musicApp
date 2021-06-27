import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
// import * as Handler from 'react-native-gesture-handler';

import { decode } from 'html-entities';
import { DeleteIcon } from '../../assets/Icons';
import { Delete, patch, post } from '../../utils/ApiRequest';
import Typography from '../Typography';
import SimpleAlert from '../Alert';
import EditPlaylist from './EditPlaylist';
import styles from './style';

const PlayList = ({
  data,
  style,
  isAdmin,
  tab,
  refreshChannel,
  channelId,
  setVideoIndex,
  videoTime,
}) => {
  const [message, setMessage] = useState();
  const [confirmation, confirmationAlert] = useState();

  const getCreatedAt = (date) => {
    const CreatedMonth = new Date(date).getMonth();
    const currentMonth = new Date(Date.now()).getMonth();
    return CreatedMonth - currentMonth;
  };

  const onPressDeleteVD = async (vdId) => {
    Delete.deleteVideo(vdId, channelId)
      .then(async () => {
        setMessage('Your Video was deleted successfully ');
        await refreshChannel();
      })
      .catch(console.log);
  };

  if (tab === 'playlist') {
    return (
      <View style={styles.verticalLayout}>
        <EditPlaylist
          data={data}
          style={style}
          onPressDeleteVD={onPressDeleteVD}
          channelId={channelId}
          refresh={refreshChannel}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Typography style={styles.PlayListControl} type="h4" color="tertiary">
        Up Next
      </Typography>
      {data && (
        <ScrollView style={styles.scrollView} horizontal>
          {data.map((Video, index) => (
            <View key={index.toString()}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setVideoIndex(index);
                  patch
                    .playVideo(channelId, {
                      clockStartTime: videoTime.clockStartTime,
                      queueStartPosition: index,
                      videoStartTime: 0,
                    })
                    .then((value) => console.log(value))
                    .catch((error) => console.log(error));
                }}
                style={styles.PlayList}
                disabled={!isAdmin}
              >
                <ImageBackground
                  source={{ uri: Video.thumbnail }}
                  style={styles.PlayListBackground}
                  imageStyle={styles.PlayListImage}
                >
                  <View style={styles.control}>
                    <Typography type="h7" color="tertiary" bold>
                      In {Video.length.toString().substr(0, 2)} min
                    </Typography>
                  </View>
                  {isAdmin && (
                    <TouchableOpacity
                      onPress={() => confirmationAlert(Video.id)}
                    >
                      <DeleteIcon />
                    </TouchableOpacity>
                  )}
                </ImageBackground>
                <Typography
                  style={styles.typography}
                  type="h7"
                  color="disabled"
                >
                  {getCreatedAt(Video.publishedAt)} months ago
                </Typography>
                <Typography
                  type="h6"
                  color="tertiary"
                  numberOfLines={3}
                  style={styles.videoTitle}
                >
                  {decode(Video.videoInfo.title)}
                </Typography>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      <SimpleAlert
        title={message}
        toggleAlert={() => setMessage()}
        simpleAlert
        isModalVisible={!!message}
        style={{ backgroundColor: '#FF9933' }}
      />

      <SimpleAlert
        toggleAlert={() => confirmationAlert()}
        content="Are You Sure you want to delete this video!!"
        onPressConfirm={() => confirmationAlert()}
        isModalVisible={!!confirmation}
        onPressCancel={() => {
          onPressDeleteVD(confirmation);
          confirmationAlert();
        }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.confirmMessage}
        confirmTitle="Cancel"
        btnWidth="30%"
        btnHeight={35}
      />
    </View>
  );
};
export default PlayList;
