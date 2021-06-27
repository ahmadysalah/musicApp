import Axios from './axios';

const patchMethod = {
  /// /// update user data ////
  updateUserData: (obj) => Axios('users', obj, 'put'),

  swapVideos: (channelId, swapInfo) =>
    Axios(`videos/${channelId}`, swapInfo, 'put'),

  updateChannel: (channelId, updateInfo) =>
    Axios(`channels/${channelId}`, updateInfo, 'put'),

  playVideo: (channelId, updateInfo) =>
    Axios(`channels/${channelId}/play`, updateInfo, 'put'),

  pauseVideo: (channelId, updateInfo) =>
    Axios(`channels/${channelId}/pause`, updateInfo, 'put'),
};

export default patchMethod;
