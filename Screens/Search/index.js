/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BackArrow } from '../../assets/Icons';
import { Friends, Loading, Typography, VideoCard } from '../../components';
import { get } from '../../utils/ApiRequest';
import { DEVICE } from '../../utils/constants';
import styles from './style';

const Search = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const [channelData, setChannelData] = useState({});
  const [channelUsers, setChannelUsers] = useState({});
  const [friends, setFriends] = useState([]);
  const [ActiveIndex, setActiveIndex] = useState(0);

  
  const noResult =
  (searchValue.length>5 && !(Object.keys(channelData).length>0 || Object.keys(channelUsers).length>0 || friends.length>0))
  
  const loadActive =  
     (searchValue.length>0 && !noResult && !(Object.keys(channelData).length>0 || Object.keys(channelUsers).length>0 || friends.length>0))


  useEffect(() => {
    if (searchValue !== '') {
      if (ActiveIndex === 1) {
        get
          .searchUsers(searchValue)
          .then(({ data }) => {
            setFriends(data);
          })
          .catch((error) => console.log({ error }));
      }
    }
  }, [searchValue, ActiveIndex]);
  const searchChannels = (value) => {
    get
      .searchChannels(value)
      .then(({ data: { channels, users } }) => {
        setChannelData(channels);
        setChannelUsers(users);
      })
      .catch((error) => console.log({ error }));
  };

  const tabs = [
    'Channels',
    'Friends',
    'Videos',
  ];

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerVisible}>
          <BackArrow onPress={() => navigation.pop()} />
          <TextInput
            autoFocus
            placeholder="Search"
            style={styles.input}
            value={searchValue}
            onChangeText={(value) => {
              setSearchValue(value);
              if (value.length >= 2) {
                searchChannels(value);
              }
            }}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {tabs.map((title, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => setActiveIndex(index)}
              style={
                ActiveIndex === index ? styles.activeTab : styles.nonActiveTab
              }
            >
              <Typography 
                type="h6" 
                style={
                ActiveIndex === index ? styles.activeText : styles.nonActiveText
                }
              >
                {title}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <Typography type="h7" style={styles.resultsText} bold>{searchValue && `Results for ${searchValue}`} </Typography>
        <>
          {channelData &&
            ActiveIndex === 0 &&
            Object.keys(channelData).map((channel, index) => (
              <VideoCard
                key={index.toString()}
                navigation={navigation}
                channel={channelData[channel]}
                users={
                  channelUsers &&
                  channelData[channel].viewers.map((user) => channelUsers[user])
                }
                channelId={channel}
              />
            ))}
          {friends &&
            ActiveIndex === 1 &&
            friends.map((userData, index) => (
              <Friends data={userData} key={index.toString()} />
            ))}
          {noResult && (
        <Typography type='h7' style={{alignSelf:'center',marginTop :DEVICE.heightP(10)}} color='secondary'> No results for {searchValue}</Typography>
      )}
        </>
      </ScrollView>
        <Loading show={loadActive} />
     
    </>
  );
};

export default Search;
