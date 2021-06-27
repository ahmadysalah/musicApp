import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { getPostDuration } from '../../utils/helperFunction';
import {
  YoutubeIcon,
  TickToCk,
  InestagremIcon,
  Hulul,
  FaceBook,
  carruncy,
  AddVideo,
} from '../../assets/Icons';
import Typography from '../Typography';
import InputText from '../InputText';
import SimpleAlert from '../Alert';
// import Button from '../Button';

import styles from './style';
import { get, post } from '../../utils/ApiRequest';
import Search from '../../assets/Icons/Search';

const AddNewVideos = ({ channelId, refresh }) => {
  const [searchInput, setSearchText] = useState();
  const [videoSearchResult, setSearchResult] = useState();
  const [message, setMessage] = useState();

  const onAddddVideo = (videoInfo) => {
    if (videoInfo && channelId)
      post
        .addNewVideo(channelId, {
          videoInfo: JSON.stringify(videoInfo),
          source: 'youtube',
          sourceId: videoInfo.id,
        })
        .then(async () => {
          setMessage('Video was Added Successfully');
          refresh && (await refresh());
        })
        .catch((err) => console.log(err.response));
  };

  const searchVideos = () => {
    Keyboard.dismiss();
    get
      .searchVideos('youtube', searchInput)
      .then(({ data }) => setSearchResult(data))
      .catch(console.log);
  };

  // const socialBtnS = [
  //   YoutubeIcon,
  //   InestagremIcon,
  //   TickToCk,
  //   FaceBook,
  //   Hulul,
  //   carruncy,
  // ];
  return (
    <View style={styles.bottomSheetStyle}>
      <SimpleAlert
        title={message}
        isModalVisible={!!message}
        toggleAlert={() => setMessage()}
        simpleAlert
        style={{ backgroundColor: '#000' }}
      />
      <View style={styles.addItemContainer}>
        <Typography type="h4">Search for Videos </Typography>
      </View>
      <InputText
        value={searchInput}
        onChange={setSearchText}
        placeholder="Search videos"
        containerStyle={styles.addInput}
        style={styles.inputStyle}
        RightIcon={() => (
          <TouchableOpacity activeOpacity={0.5} onPress={searchVideos}>
            <Search />
          </TouchableOpacity>
        )}
        LeftIcon={YoutubeIcon}
        submit={searchVideos}
      />
      {/* 
      <View style={styles.searchControl}>
        {socialBtnS.map((Btn, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => setFocus(index)}
            activeOpacity={0.7}
            style={[
              styles.socialBtn,
              focus === index && { backgroundColor: COLORS.highlight },
            ]}
          >
            <Btn />
          </TouchableOpacity>
        ))}
      </View> */}

      {videoSearchResult && (
        <>
          <Typography type="h6" bold>
            Results for &apos;{searchInput}&apos;
          </Typography>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewStyle}
          >
            {videoSearchResult.results.map((Video, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.videoCards}
                onPress={() => onAddddVideo(Video)}
              >
                <ImageBackground
                  source={{ uri: Video.thumbnail }}
                  style={styles.addVideoImage}
                  imageStyle={styles.PlayListImage}
                />
                <Typography
                  type="h5"
                  align="left"
                  numberOfLines={3}
                  style={styles.addVideoTitle}
                >
                  {Video.title}
                </Typography>
                <Typography type="h7" color="secondary">
                  {getPostDuration(Video.publishedAt)}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AddNewVideos;
