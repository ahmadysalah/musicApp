const updateUserData = {
  ADD_MESSAGE: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      channels: {
        ...userData.channels,
        [messagePayload.channelId]: {
          ...userData.channels[messagePayload.channelId],
          createdAt: messagePayload.message.createdAt,
          lastMessageId: messagePayload.message.id,
          lastMessageAt: messagePayload.message.createdAt,
          lastMessageUsername: messagePayload.message.author.username,
          lastMessageContent: messagePayload.message.content,
        },
      },
    }),

  ADD_FRIEND: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      channels: {
        ...userData.channels,
        [messagePayload.channelId]: {
          ...messagePayload.channel,
        },
      },
      relationships: {
        ...userData.relationships,
        receivedFriendRequests: userData.relationships.receivedFriendRequests.filter(
          (item) => item !== messagePayload.userId
        ),
        sentFriendRequests: userData.relationships.sentFriendRequests.filter(
          (item) => item !== messagePayload.userId
        ),
      },
      users: {
        ...userData.users,
        ...messagePayload.users,
      },
    }),

  DELETE_FRIEND: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      channels: {
        ...userData.channels,
      },
      relationships: {
        ...userData.relationships,
        friends: userData.relationships.friends.filter(
          (item) => item !== messagePayload.userId
        ),
      },
    }),

  DELETE_CHANNEL: ({ setUserData, userData, messagePayload }) => {
    delete userData.channels[messagePayload.channelId];
    setUserData({
      ...userData,
      channels: {
        ...userData.channels,
      },
    });
  },

  ADD_RECEIVED_FRIEND_REQUEST: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      relationships: {
        ...userData.relationships,
        receivedFriendRequests: [
          ...userData.relationships.receivedFriendRequests,
          messagePayload.userId,
        ],
      },
      users: {
        ...userData.users,
        [messagePayload.userId]: {
          ...messagePayload.user,
        },
      },
    }),

  DELETE_RECEIVED_FRIEND_REQUEST: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      relationships: {
        ...userData.relationships,
        receivedFriendRequests: userData.relationships.receivedFriendRequests.filter(
          (item) => item !== messagePayload.userId
        ),
      },
    }),

  DELETE_SENT_FRIEND_REQUEST: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      relationships: {
        ...userData.relationships,
        sentFriendRequests: userData.relationships.sentFriendRequests.filter(
          (item) => item !== messagePayload.userId
        ),
      },
    }),

  ADD_CHANNEL: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      channels: {
        ...userData.channels,
        [messagePayload.channelId]: {
          ...messagePayload.channel,
        },
      },
      users: {
        ...userData.users,
        ...messagePayload.users,
      },
    }),

  SET_FRIEND_REQUEST: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      relationships: {
        ...userData.relationships,
        sentFriendRequests: [
          ...userData.relationships.sentFriendRequests,
          messagePayload.data.userId,
        ],
      },
      users: {
        ...userData.users,
        [messagePayload.data.userId]: {
          ...messagePayload.data.user,
        },
      },
    }),

  REJECT_FRIEND_REQUEST: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      relationships: {
        ...userData.relationships,
        receivedFriendRequests: userData.relationships.receivedFriendRequests.filter(
          (item) => item !== messagePayload.userId
        ),
      },
    }),

  CANCEL_FRIEND_REQUEST: ({ setUserData, userData, messagePayload }) =>
    setUserData({
      ...userData,
      relationships: {
        ...userData.relationships,
        sentFriendRequests: userData.relationships.sentFriendRequests.filter(
          (item) => item !== messagePayload.userId
        ),
      },
    }),
};

export default updateUserData;
