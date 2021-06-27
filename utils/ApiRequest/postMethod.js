/* eslint-disable no-return-await */
import Axios from './axios';

const postMethod = {
  // login function return promise
  userLogin: async (usernameOrEmail, password) =>
    await Axios('sessions/login', { usernameOrEmail, password }, 'post'),

  // SignUp function return promise
  // userData contain these data { firstName,lastName,username,dateOfBirth,email,password,}
  userSignUp: async (userData) => await Axios('users', userData, 'post'),

  /// /  log out/
  signOut: () => Axios('sessions/logout', {}, 'post'),

  /// /  create channel
  createChannel: ({ channelName, channelDescription, publicChannel }, blob) =>
    Axios(
      'channels',
      blob || {
        name: channelName,
        description: channelDescription,
        public: publicChannel,
      },
      'post'
    ),

  /// /  Follow channel/
  followChannel: (channelId) => Axios(`members/${channelId}`, {}, 'post'),

  /// Add message
  addMessage: (messageInfo) => Axios('/messages', messageInfo, 'post'),
  /// add video to channel
  addNewVideo: (channelId, videoInfo) =>
    Axios(`videos/${channelId}`, { ...videoInfo }, 'post'),

  /// make admin
  makeAdmin: (channelId, userId) =>
    Axios(`/members/${channelId}/admins`, { adminId: userId }, 'post'),

  // band user
  addBan: (channelId, bannedId) =>
    Axios(`/members/${channelId}/bans`, { bannedId }, 'post'),

  // add post
  addPost: (channelId, content) =>
    Axios('posts', { channelId, content }, 'post'),

  // add like
  addLike: ({ postId, commentId }) => {
    if (postId) {
      return Axios(`/posts/${postId}/likes`, { postId }, 'post');
    }
    if (commentId) {
      return Axios(`/comments/${commentId}/likes`, { commentId }, 'post');
    }
  },
  // add comment
  addComment: (commentInfo) => Axios('/comments', commentInfo, 'post'),

  // send Friend request
  sendFriendRequest: (requesteeId) =>
    Axios('/users/friendRequests', { requesteeId }, 'post'),

  // Accept Friend request
  acceptFriendRequest: (requesterId) =>
    Axios('/users/friends', { requesterId }, 'post'),

  /// ////////create Room
  createRoom: (userIds) => Axios('/channels/rooms', { userIds }, 'post'),

  /// update room
  updateRoom: (roomId, updateInfo) =>
    Axios(`/channels/rooms/${roomId}`, updateInfo, 'post'),
};

export default postMethod;
