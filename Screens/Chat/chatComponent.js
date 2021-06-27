import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollToBottom, Send } from '../../assets/Icons';
import { COLORS, WS_EVENTS } from '../../utils/constants';
import { get, post, Delete } from '../../utils/ApiRequest';
import AuthContext from '../../utils/AuthContext';
import { AsyncStore } from '../../utils/AsyncStorage';
import styles from './style';
import { Typography } from '../../components';
import updateUserData from '../../utils/updateUserData';

const ChatComponent = ({ channelId }) => {
  const [myMessages, setMyMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loadingEarlier, startLoadingEarlier] = useState(false);
  const [isLoadingEarlier, setLoadEarlier] = useState(true);
  const [messageValue, setMessageValue] = useState();
  const [allMessage, setAllMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    // {
    //   _id: 0,
    //   text: 'New room created.',
    //   createdAt: new Date().getTime(),
    //   system: true,
    // },
    // example of chat message
    // {
    //   _id: 1,
    //   text: 'Hello!',
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: 'Ahmed',
    //   },
    // },
  ]);
  const {
    userData,
    socketMessageType,
    socketPayload,
    setSocketPayload,
    setUserData,
    unReadMessages,
    setUnReadMessages,
  } = useContext(AuthContext);

  // update message state to be readied from user
  const updateReadMessage = async () => {
    const lastMessages = unReadMessages;
    delete lastMessages[channelId];
    await AsyncStore('unReadMessages', lastMessages);
    setUnReadMessages(lastMessages);
  };

  // this for left the room
  const LeaveRoom = () => {
    Delete.leaveRoom(channelId)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setSocketPayload();
    get
      .getMessages({
        channelId,
      })
      .then(({ data: { messages } }) => {
        setAllMessages([]);
        Object.keys(messages).map((messageId) =>
          setAllMessages((oldMessage) => [
            {
              _id: messageId,
              text: messages[messageId].content.replace(
                /https?:\/\/.*\.(?:png|jpg|gif)/g,
                ''
              ),
              createdAt: messages[messageId].createdAt,
              user: {
                _id: messages[messageId].userId,
                name: messages[messageId].author.username,
                avatar:
                  messages[messageId].author.avatar ||
                  'https://i.imgur.com/An9lt8E.png',
              },
              image:
                messages[messageId].content.match(
                  /https?:\/\/.*\.(?:png|jpg|gif)/g
                ) &&
                messages[messageId].content
                  .match(/https?:\/\/.*\.(?:png|jpg|gif)/g)
                  .join(),
            },
            ...oldMessage,
          ])
        );
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const onLoadEarlier = (beforeMessageId) => {
    console.log('********** //// Messages //// *******');
    startLoadingEarlier(true);
    setMyMessages(allMessage);
    setLoadEarlier(false);
    get
      .getMessages({
        channelId,
        beforeMessageId,
      })
      .then(({ data: { messages } }) => {
        console.log(messages);
        if (Object.keys(messages).length > 0) {
          setAllMessages([]);
          Object.keys(messages).map((messageId) =>
            setAllMessages((oldMessage) => [
              {
                _id: messageId,
                text: messages[messageId].content.replace(
                  /https?:\/\/.*\.(?:png|jpg|gif)/g,
                  ''
                ),
                createdAt: messages[messageId].createdAt,
                user: {
                  _id: messages[messageId].userId,
                  name: messages[messageId].author.username,
                  avatar:
                    messages[messageId].author.avatar ||
                    'https://i.imgur.com/An9lt8E.png',
                },
                image:
                  messages[messageId].content.match(
                    /https?:\/\/.*\.(?:png|jpg|gif)/g
                  ) &&
                  messages[messageId].content
                    .match(/https?:\/\/.*\.(?:png|jpg|gif)/g)
                    .join(),
              },
              ...oldMessage,
            ])
          );
          setAllMessages((oldMessage) => [...myMessages, ...oldMessage]);
          setLoadEarlier(true);
          startLoadingEarlier(false);
        } else {
          startLoadingEarlier(false);
        }
      })
      .catch((error) => {
        startLoadingEarlier(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      socketMessageType === WS_EVENTS.CHANNEL.ADD_MESSAGE &&
      socketPayload !== undefined
    ) {
      if (
        socketPayload.message &&
        allMessage.filter(({ _id }) => _id !== socketPayload.message.id)
      ) {
        setAllMessages(
          GiftedChat.append(allMessage, [
            {
              _id: socketPayload.message.id,
              text: socketPayload.message.content.replace(
                /https?:\/\/.*\.(?:png|jpg|gif)/g,
                ''
              ),
              createdAt: socketPayload.message.createdAt,
              user: {
                _id: socketPayload.message.author.id,
                name: socketPayload.message.author.username,
                avatar:
                  socketPayload.message.author.avatar ||
                  'https://i.imgur.com/An9lt8E.png',
              },
              image:
                socketPayload.message.content.match(
                  /https?:\/\/.*\.(?:png|jpg|gif)/g
                ) &&
                socketPayload.message.content
                  .match(/https?:\/\/.*\.(?:png|jpg|gif)/g)
                  .join(),
            },
          ])
        );
        setSocketPayload();
      }
    }
    updateReadMessage();
  }, [socketMessageType, socketPayload]);

  // helper method that is sends a message
  const handleSend = (newMessage) => {
    post
      .addMessage({
        channelId,
        content: newMessage,
      })
      .then(({ data }) => {
        updateUserData.ADD_MESSAGE({
          setUserData,
          userData,
          messagePayload: data,
        });
        updateReadMessage();
        setMessageValue();
        setAllMessages([
          {
            _id: data.message.id,
            text: data.message.content.replace(
              /https?:\/\/.*\.(?:png|jpg|gif)/g,
              ''
            ),
            createdAt: data.message.createdAt,
            user: {
              _id: userData.id,
              name: userData.username,
              avatar: userData.avatar || 'https://i.imgur.com/An9lt8E.png',
            },
            image:
              data.message.content.match(/https?:\/\/.*\.(?:png|jpg|gif)/g) &&
              data.message.content
                .match(/https?:\/\/.*\.(?:png|jpg|gif)/g)
                .join(),
          },
          ...allMessage,
        ]);
      })
      .catch(console.log);
  };

  return (
    <View style={{ backgroundColor: COLORS.tertiary, flex: 1 }}>
      {/* {isOpen && (
        <View
          style={{
            width: '40%',
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            top: DEVICE.heightP(9.2),
            position: 'absolute',
            elevation: 15,
            zIndex: 200,
            height: DEVICE.widthP(10),
            right: 5,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={LeaveRoom}
          >
            <Typography type="h4" style={{ paddingHorizontal: 10 }}>
              Leave
            </Typography>
            <Leave />
          </TouchableOpacity>
        </View>
      )} */}
      {loadingEarlier && <ActivityIndicator color="blue" />}
      {isLoading && (
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            bottom: '6%',
            zIndex: 200,
            position: 'absolute',
          }}
        >
          {Array.apply(null, { length: 4 }).map((item, index) => (
            <Placeholder
              key={index.toString()}
              Animation={ShineOverlay}
              Left={PlaceholderMedia}
              style={{ margin: 10 }}
            >
              <PlaceholderLine width={50} />
              <PlaceholderLine width={30} />
            </Placeholder>
          ))}
        </View>
      )}

      {allMessage && (
        <GiftedChat
          renderInputToolbar={() => (
            <View
              style={{
                width: '100%',
                height: 54,
                paddingHorizontal: '2%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: -10,
              }}
            >
              <TextInput
                placeholder="Type a message..."
                value={messageValue}
                onChangeText={setMessageValue}
                style={styles.input}
              />
              <TouchableOpacity
                disabled={!messageValue}
                onPress={() => handleSend(messageValue)}
                containerStyle={{
                  width: '10%',
                  height: 44,
                  padding: '2%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Send
                  color={messageValue ? COLORS.highlight : COLORS.disabled}
                />
              </TouchableOpacity>
            </View>
          )}
          infiniteScroll
          messages={allMessage}
          user={{
            _id: userData.id,
            name: 'Hassan',
            avatar: userData.avatar || 'https://i.imgur.com/An9lt8E.png',
          }}
          placeholder="Type your message ..."
          quickReplyStyle={{ backgroundColor: 'red' }}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={() => <ScrollToBottom />}
          scrollToBottomStyle={{
            position: 'absolute',
            right: '5%',
            bottom: '2%',
          }}
          loadEarlier={!isLoading && allMessage.length > 30 && isLoadingEarlier}
          onLoadEarlier={() =>
            onLoadEarlier(
              allMessage[allMessage.length - 1]._id,
              allMessage[0]._id
            )
          }
          messagesContainerStyle={{
            backgroundColor: 'white',
            paddingBottom: 12,
          }}
          // onSend={(newMessage) => handleSend(newMessage)}
        />
      )}
    </View>
  );
};

export default ChatComponent;
