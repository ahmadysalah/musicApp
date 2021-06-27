import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { View, ActivityIndicator } from 'react-native';
import {
  CreateRoom,
  UserChat,
  Button,
  Typography,
  BottomSheet,
} from '../../components';
import AuthContext from '../../utils/AuthContext';
import { COLORS, DEVICE } from '../../utils/constants';
import { post } from '../../utils/ApiRequest';
import styles from './style';
import updateUserData from '../../utils/updateUserData';
import { Compose } from '../../assets/Icons';

const UsersChat = ({ navigation }) => {
  const {
    userData,
    unReadMessages,
    onlineFriends,
    setUserData,
    scrollChat,
  } = useContext(AuthContext);
  const [animation, setAnimation] = useState(undefined);
  const [roomUsers, setRoomUsers] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const handleCreateRoom = () => {
    post
      .createRoom(roomUsers)
      .then(({ data }) => {
        updateUserData.ADD_CHANNEL({
          setUserData,
          userData,
          messagePayload: data,
        });
        setRoomUsers([]);
        setAnimation();
      })
      .catch(console.log);
  };

  const renderButton = (className) => (
    <TouchableOpacity
      containerStyle={styles[className]}
      onPress={() => {
        setAnimation(!animation);
        navigation.setOptions({
          tabBarVisible: false,
          headerShown: false,
        });
      }}
      activeOpacity={0.9}
    >
      <View style={styles.composeButton}>
        {/* <Compose color={COLORS.primary} /> */}
        <Typography type="h2">+</Typography>
      </View>
    </TouchableOpacity>
  );

  const renderUserItem = ({ item }) =>
    userData?.channels[item]?.type !== 'channel' && (
      <UserChat
        isOnline={onlineFriends.length > 0 && onlineFriends.includes(item)}
        name={
          userData?.channels[item]?.type === 'self'
            ? userData.username
            : userData?.channels[item]?.members.map((userId, index) => {
                if (userId !== userData.id) {
                  if (index > 2) {
                    return;
                  }
                  return ` ${userData?.users[userId]?.username} `;
                }
              })
        }
        isYou={
          userData?.channels[item]?.lastMessageUsername === userData.username
        }
        lastMessage={userData?.channels[item]?.lastMessageContent}
        messageTime={userData?.channels[item]?.lastMessageAt}
        image={
          userData?.channels[item]?.type === 'self'
            ? userData.avatar
            : userData.channels[item] &&
              userData.users[
                userData.channels[item].members.filter(
                  (userId) => userId !== userData.id
                )[0]
              ].avatar
        }
        onPress={() =>
          navigation.navigate('chat', {
            channelId: item,
            avatar:
              userData?.channels[item]?.type === 'self'
                ? userData.avatar
                : userData.channels[item] &&
                  userData.users[
                    userData.channels[item].members.filter(
                      (userId) => userId !== userData.id
                    )[0]
                  ].avatar,
            username:
              userData?.channels[item]?.type === 'self'
                ? userData.username
                : userData.channels[item] &&
                  userData.users[
                    userData.channels[item].members.filter(
                      (userId) => userId !== userData.id
                    )[0]
                  ].username,
          })
        }
        isRead={!!unReadMessages[item]}
        numberOfMessages={unReadMessages[item]}
      />
    );

  return (
    <>
      {!animation && renderButton('buttonFirst')}
      <Animatable.View
        style={[
          styles.createRoomView,
          animation === undefined && { display: 'none' },
        ]}
        easing="ease-out-quint"
        animation={animation ? 'bounceInRight' : 'slideOutRight'}
      >
        {/* <BottomSheet
        responsive
        open={animation}
        setActive={setAnimation}
        headerTitle="Select friends"
        closeInside
        transparentOverlay
      > */}
        <CreateRoom
          users={roomUsers}
          setUsers={setRoomUsers}
          friends={userData.relationships && userData.relationships.friends}
          createRoom={handleCreateRoom}
          closePage={() => {
            setAnimation(false);
            navigation.setOptions({
              tabBarVisible: true,
            });
          }}
        />
        {/* </BottomSheet> */}
      </Animatable.View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Filter friends"
          value={searchValue}
          onChangeText={setSearchValue}
          style={styles.input}
        />
      </View>
      {userData.channels ? (
        <FlatList
          ref={scrollChat}
          contentContainerStyle={animation && { opacity: 0.2 }}
          data={
            searchValue
              ? Object.values(userData.channels)
                  .map(({ id, members }) => {
                    if (
                      Object.keys(userData.users)
                        .filter(
                          (key) =>
                            userData.users[key].username
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) &&
                            key !== userData.id
                        )
                        .filter((item) => members.includes(item)).length > 0
                    ) {
                      return id;
                    }
                  })
                  .reverse()
              : [
                  ...new Set(onlineFriends),
                  ...Object.keys(unReadMessages)
                    .sort((a, b) => unReadMessages[b] - unReadMessages[a])
                    .filter((item) => !onlineFriends.includes(item)),
                  ...Object.values(userData.channels)
                    .sort((a, b) => {
                      const firstDate = new Date(a.lastMessageAt);
                      const secondeDate = new Date(b.lastMessageAt);
                      return secondeDate - firstDate;
                    })
                    .map(
                      ({ id }) =>
                        !onlineFriends.includes(id) && !unReadMessages[id] && id
                    ),
                ]
          }
          renderItem={renderUserItem}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()}
          style={{
            backgroundColor: 'white',
            width: DEVICE.width,
            height: DEVICE.height,
          }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            paddingBottom: '30%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color="blue" />
        </View>
      )}
      {userData.channels &&
        !!searchValue &&
        Object.values(userData.channels)
          .map(({ id, members }) => {
            if (
              Object.keys(userData.users)
                .filter(
                  (key) =>
                    userData.users[key].username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) &&
                    key !== userData.id
                )
                .filter((item) => members.includes(item)).length > 0
            ) {
              return id;
            }
          })
          .filter((value) => value !== undefined).length === 0 && (
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingBottom: '30%',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography type="h6" color="secondary">
              Nothing was found 🤔
            </Typography>
          </View>
        )}
    </>
  );
};

export default UsersChat;
