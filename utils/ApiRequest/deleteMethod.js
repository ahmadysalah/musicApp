import Axios from './axios';

const deleteMethods = {
  /// ///////////// unFollow channel /////////
  unFollowChannel: (channelId) => Axios(`members/${channelId}`, {}, 'delete'),

  /// delete blocked user
  deleteBlockedById: (blockedId) =>
    Axios(`users/blocks/${blockedId}`, {}, 'delete'),

  /// delete video
  deleteVideo: (channelVideoId, channelId) =>
    Axios(`videos/${channelVideoId}`, { channelId }, 'delete'),

  // delete channel
  deleteChannel: (channelId) => Axios(`/channels/${channelId}`, {}, 'delete'),

  /// delete admin
  deleteAdmin: (channelId, userId) =>
    Axios(`/members/${channelId}/admins/${userId}`, {}, 'delete'),

  // delete band user
  deleteBan: (channelId, bannedId) =>
    Axios(`/members/${channelId}/bans/${bannedId}`, {}, 'delete'),

  // delete post
  deletePost: (postId) => Axios(`/posts/${postId}`, {}, 'delete'),

  // delete like
  deleteLike: ({ postId, commentId }) => {
    if (postId) {
      return Axios(`/posts/${postId}/likes`, {}, 'delete');
    }
    if (commentId) {
      return Axios(`/comments/${commentId}/likes`, {}, 'delete');
    }
  },

  // delete comment
  deleteComment: (commentId) => Axios(`/comments/${commentId}`, {}, 'delete'),

  // leave Room
  leaveRoom: (roomId) => Axios(`/channels/rooms/${roomId}`, {}, 'delete'),

  // cancel when you are the sender for request
  cancelFriendRequest: (requesteeId) =>
    Axios(`/users/friendRequests/${requesteeId}/cancel`, {}, 'delete'),

  // reject when someone send request for you
  rejectFriendRequest: (requesterId) =>
    Axios(`/users/friendRequests/${requesterId}/reject`, {}, 'delete'),

  // delete friend
  unfriendUser: (friendId) => Axios(`/users/friends/${friendId}`, {}, 'delete'),
};

export default deleteMethods;
