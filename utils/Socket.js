import * as Notifications from 'expo-notifications';
import { get } from './ApiRequest';
import { WS_EVENTS } from './constants';
import updateUserData from './updateUserData';

let socket;
let timeout;
let pingCount = 0;

// heartbeat the socket after ping
const heartbeat = () => {
  try {
    clearTimeout(timeout);
    // Enqueues data to be transmitted.
    socket.send(JSON.stringify({ type: WS_EVENTS.PONG }));
    // Refreshes timeout
    timeout = setTimeout(() => {
      socket.close();
    }, 45000 + 1000);
  } catch (error) {
    // Handle error
    return Promise.resolve(false);
  }
};

// send notification
const sendNotification = (title, body) => {
  // First, set the handler that will cause the notification
  // to show the alert
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Second, call the method
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
};

// socket Function to handel all event
const socketFunction = ({
  userData,
  setUserData,
  setSocketMessageType,
  setSocketPayload,
  setOnlineFriends,
  onlineFriends,
  updateReadMessages,
  setRefreshSocket,
  runNotification,
}) => {
  const onRefreshSocket = () => {
    setRefreshSocket(true);
    get
      .refreshSessions()
      .then((clientData) => {
        setUserData(clientData.data);
        setRefreshSocket(true);
      })
      .catch(() => setUserData());
    pingCount = 0;
  };

  if (userData) {
    // create the socket
    socket = new WebSocket('wss://ws.popitalk.com', userData.wsTicket);
    // this binary to convert data to be readied in mobile
    // socket.binaryType = 'blob';
    socket.onmessage = ({ data: message }) => {
      const parsedMessage = JSON.parse(message);
      const messageType = parsedMessage.type;
      const messagePayload = parsedMessage.payload;
      console.log('**** Message ****');
      console.log(pingCount);
      setSocketMessageType(messageType);
      console.log('MESSAGE TYPE', messageType);
      console.log('MESSAGE Payload', messagePayload);

      switch (messageType) {
        // Hello event return online friends
        case WS_EVENTS.HELLO:
          setOnlineFriends(messagePayload.onLineFriends);
          break;

        // you must send message to socket after ping message to still the socket channel connect
        case WS_EVENTS.PING:
          heartbeat();
          pingCount++;
          if (pingCount === 10) {
            onRefreshSocket();
          }
          break;

        // set the offline friends and delete them from online friends in userData
        case WS_EVENTS.CHANNEL.SET_FRIEND_OFFLINE:
          setOnlineFriends(
            onlineFriends.splice(
              onlineFriends.findIndex(
                (item) => item === messagePayload.channelId
              ),
              1
            )
          );
          break;

        // set online friends after data coming from socket response
        case WS_EVENTS.CHANNEL.SET_FRIEND_ONLINE:
          setOnlineFriends((onlineF) => [...onlineF, messagePayload.channelId]);

          break;

        // add the new message to userData message rooms
        case WS_EVENTS.CHANNEL.ADD_MESSAGE:
          updateReadMessages(messagePayload.channelId);
          setSocketPayload(messagePayload);
          if (runNotification) {
            sendNotification(
              messagePayload.message.author.username,
              messagePayload.message.content
            );
          }
          setRefreshSocket(false);
          updateUserData.ADD_MESSAGE({ setUserData, userData, messagePayload });
          break;

        // add friend
        case WS_EVENTS.USER.ADD_FRIEND:
          updateReadMessages(messagePayload.channelId);
          setSocketPayload(messagePayload);
          if (runNotification) {
            sendNotification(
              'Friend Request',
              `${messagePayload.user.username} accepted your friend request`
            );
          }
          setRefreshSocket(false);
          updateUserData.ADD_FRIEND({ setUserData, userData, messagePayload });
          break;

        // delete friend
        case WS_EVENTS.USER.DELETE_FRIEND:
          setSocketPayload(messagePayload);
          setRefreshSocket(false);
          updateUserData.DELETE_FRIEND({
            userData,
            setUserData,
            messagePayload,
          });
          break;

        // delete channel
        case WS_EVENTS.CHANNEL.DELETE_CHANNEL:
          setRefreshSocket(false);
          setSocketPayload(messagePayload);
          updateUserData.DELETE_CHANNEL({
            setUserData,
            userData,
            messagePayload,
          });
          break;

        // add coming friend request
        case WS_EVENTS.USER.ADD_RECEIVED_FRIEND_REQUEST:
          setSocketPayload(messagePayload);
          setRefreshSocket(false);
          if (runNotification) {
            sendNotification(
              'Friend Request',
              `${messagePayload.user.username} sended friend request`
            );
          }
          updateUserData.ADD_RECEIVED_FRIEND_REQUEST({
            setUserData,
            userData,
            messagePayload,
          });
          break;

        // delete coming friend request
        case WS_EVENTS.USER.DELETE_RECEIVED_FRIEND_REQUEST:
          setSocketPayload(messagePayload);
          setRefreshSocket(false);
          updateUserData.DELETE_RECEIVED_FRIEND_REQUEST({
            setUserData,
            userData,
            messagePayload,
          });
          break;

        // delete sended friend request
        case WS_EVENTS.USER.DELETE_SENT_FRIEND_REQUEST:
          setSocketPayload(messagePayload);
          setRefreshSocket(false);
          updateUserData.DELETE_SENT_FRIEND_REQUEST({
            setUserData,
            userData,
            messagePayload,
          });
          break;

        case WS_EVENTS.CHANNEL.UPDATE_CHANNEL:
          setSocketPayload(messagePayload);
          break;

        case WS_EVENTS.VIDEO_CONTROL.ADD_VIDEO:
          setSocketPayload(messagePayload);
          break;

        default:
          break;
      }
    };
  }

  socket.onopen = () => {
    console.log('socket opened');
  };

  socket.onerror = ({ message }) => {
    onRefreshSocket();
    console.log('socket Error', message);
  };
};

export { socketFunction, heartbeat };
