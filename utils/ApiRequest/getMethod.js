import Axios from './axios';

const getMethod = {
  /// / user Data
  getUserData: (userID) => Axios(`users/${userID}`),
  /// refresh user token

  validateSessions: () => Axios(`sessions/validate`),
  refreshSessions: () => Axios(`sessions/refresh`),
  /// / blocked users
  getBlockedUsers: async () => {
    const {
      data: { relationships },
    } = await Axios(`sessions/validate`);
    return relationships.blocked;
  },
  /// / get user by id//
  getUserById: (userID) => Axios(`/users/${userID}`),

  ///
  getUsersFromArray: async (userArray) =>
    await Promise.all(
      userArray.map(async (userId) => {
        const { data } = await Axios(`/users/${userId}`);
        return data;
      })
    ),
  /// / search channels //
  searchChannels: (channelName) =>
    Axios(`/channels/search?channelName=${channelName}`),

  /// get following ////
  getFollowing: () => Axios('channels/following'),

  /// get channel data ////
  getChannelData: (channelId) =>
    Axios(`channels/channel?channelId=${channelId}`),

  /// search Friend ////
  searchUsers: (friend) => Axios(`/users?username=${friend}`),

  /// get Trending ////
  getTrending: (page) => Axios(`/channels/trending?page=${page}`),

  /// get Trending ////
  getDiscover: (page) => Axios(`/channels/discover?page=${page}`),

  /// get channel
  getChannel: (channelId, leave) => {
    if (leave)
      return Axios(`/channels/channel?channelId=${channelId}&leave=${leave}`);
    return Axios(`/channels/channel?channelId=${channelId}`);
  },

  getMessages: ({ channelId, afterMessageId, beforeMessageId }) => {
    if (!afterMessageId && !beforeMessageId) {
      return Axios(`/messages/${channelId}`);
    }
    if (afterMessageId && !beforeMessageId) {
      return Axios(`/messages/${channelId}?afterMessageId=${afterMessageId}`);
    }
    if (!afterMessageId && beforeMessageId) {
      return Axios(`/messages/${channelId}?beforeMessageId=${beforeMessageId}`);
    }
    return Axios(
      `/messages/${channelId}?afterMessageId=${afterMessageId}&beforeMessageId=${beforeMessageId}`
    );
  },
  searchVideos: (source, terms, page) =>
    Axios(
      `/videos/search?source=${source}${
        terms ? `&terms=${encodeURI(terms)}` : ''
      }${page ? `&page=${page}` : ''}`
    ),
};

export default getMethod;
