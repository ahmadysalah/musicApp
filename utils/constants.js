import { Platform, Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as widthP,
  heightPercentageToDP as heightP,
} from 'react-native-responsive-screen';

// check device width and height without the soft menu bar
const { width, height } = Dimensions.get('window');

const DEVICE = {
  // device type ios or android
  platform: Platform.OS,

  // responsive width and height
  widthP,
  heightP,

  // device width and height
  width,
  height,
};
// Colors in all screens
const COLORS = {
  primary: '#323232',
  secondary: '#767676',
  disabled: '#DCDCDC',
  tertiary: '#FFFFFF',
  highlight: '#1DA4FE',
  error: '#FF4040',
  border: '#E2E2E2',
  Gradient: {
    primary: ['#1DA4FE', '#1DA4FE'],
    light: ['#98E4FA', '#00C3FF'],
    cancel: ['#FC6D5A', '#FA3535'],
    brand: ['#76BDFF', '#FF66FE', '#FFC4AB'],
    tertiary: ['#F2F2F2', '#F2F2F2'],
  },
};

const GLOBAL_STYLE = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexColum: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxShadow: {
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
});

const WS_EVENTS = {
  HELLO: 'HELLO',
  PING: 'PING',
  PONG: 'PONG',
  USER: {
    DELETE_SENT_FRIEND_REQUEST: 'DELETE_SENT_FRIEND_REQUEST',
    ADD_RECEIVED_FRIEND_REQUEST: 'ADD_RECEIVED_FRIEND_REQUEST',
    DELETE_RECEIVED_FRIEND_REQUEST: 'DELETE_RECEIVED_FRIEND_REQUEST',
    ADD_FRIEND: 'ADD_FRIEND',
    DELETE_FRIEND: 'DELETE_FRIEND',
    ADD_BLOCKER: 'ADD_BLOCKER',
    DELETE_BLOCKER: 'DELETE_BLOCKER',
    SUBSCRIBE_CHANNEL: 'SUBSCRIBE_CHANNEL',
    UNSUBSCRIBE_CHANNEL: 'UNSUBSCRIBE_CHANNEL',
    ADD_CHANNEL: 'ADD_CHANNEL',
  },
  CHANNEL: {
    SET_FRIEND_ONLINE: 'SET_FRIEND_ONLINE',
    SET_FRIEND_OFFLINE: 'SET_FRIEND_OFFLINE',
    DELETE_FRIEND: 'DELETE_FRIEND',
    UPDATE_CHANNEL: 'UPDATE_CHANNEL',
    DELETE_CHANNEL: 'DELETE_CHANNEL',
    ADD_MEMBER: 'ADD_MEMBER',
    ADD_MEMBERS: 'ADD_MEMBERS',
    DELETE_MEMBER: 'DELETE_MEMBER',
    ADD_ADMIN: 'ADD_ADMIN',
    DELETE_ADMIN: 'DELETE_ADMIN',
    ADD_BAN: 'ADD_BAN',
    DELETE_BAN: 'DELETE_BAN',
    ADD_MESSAGE: 'ADD_MESSAGE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    ADD_POST: 'ADD_POST',
    DELETE_POST: 'DELETE_POST',
    ADD_POST_LIKE: 'ADD_POST_LIKE',
    DELETE_POST_LIKE: 'DELETE_POST_LIKE',
    ADD_COMMENT: 'ADD_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    ADD_COMMENT_LIKE: 'ADD_COMMENT_LIKE',
    DELETE_COMMENT_LIKE: 'DELETE_COMMENT_LIKE',
    ADD_VIEWER: 'ADD_VIEWER',
    DELETE_VIEWER: 'DELETE_VIEWER',
  },
  USER_CHANNEL: {
    JOIN_CHANNEL: 'JOIN_CHANNEL',
    LEAVE_CHANNEL: 'LEAVE_CHANNEL',
    BEFRIEND: 'BEFRIEND',
    UNFRIEND: 'UNFRIEND',
    BLOCK_FRIEND: 'BLOCK_FRIEND',
  },
  USERS_CHANNELS: {
    UPDATE_USER: 'UPDATE_USER',
  },
  VIDEO_CONTROL: {
    ADD_VIDEO: 'ADD_VIDEO',
    DELETE_VIDEO: 'DELETE_VIDEO',
    REORDER_QUEUE: 'REORDER_QUEUE',
  },
};
export { DEVICE, COLORS, GLOBAL_STYLE, RFValue, WS_EVENTS };
