import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { Typography } from '../../components';
import { Delete, post } from '../../utils/ApiRequest';
import AuthContext from '../../utils/AuthContext';
import updateUserData from '../../utils/updateUserData';
import FriendRequest from './FriendRequest';

const Notification = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [isPressed, setPressed] = useState(false);
  const { scrollNotification } = useContext(AuthContext);
  const onRejectRequest = (id) => {
    setPressed(true);
    Delete.rejectFriendRequest(id)
      .then(({ data }) => {
        updateUserData.REJECT_FRIEND_REQUEST({
          setUserData,
          userData,
          messagePayload: data,
        });
        setPressed(false);
      })
      .catch((error) => console.log(error));
  };

  const onCancelRequest = (id) => {
    setPressed(true);
    Delete.cancelFriendRequest(id)
      .then(({ data }) => {
        updateUserData.CANCEL_FRIEND_REQUEST({
          setUserData,
          userData,
          messagePayload: data,
        });
        setPressed(false);
      })
      .catch((error) => console.log(error));
  };

  const onAcceptRequest = (id) => {
    setPressed(true);
    post
      .acceptFriendRequest(id)
      .then(({ data }) => {
        setPressed(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ScrollView ref={scrollNotification}>
        {userData?.relationships?.receivedFriendRequests.length > 0 && (
          <>
            <Typography
              type="h6"
              color="secondary"
              bold
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
            >
              FRIEND REQUESTS
            </Typography>
            {userData?.relationships?.receivedFriendRequests.map(
              (userId, index) => (
                <FriendRequest
                  isDisable={isPressed}
                  key={index.toString()}
                  avatar={
                    userData.users[userId].avatar ||
                    'https://i.imgur.com/An9lt8E.png'
                  }
                  userName={userData.users[userId].username}
                  name={`${userData.users[userId].firstName}  ${userData.users[userId].lastName}`}
                  onAccept={() => onAcceptRequest(userId)}
                  onCancel={() => onRejectRequest(userId)}
                />
              )
            )}
          </>
        )}
        {userData?.relationships?.sentFriendRequests.length > 0 && (
          <>
            <Typography
              style={{
                alignSelf: 'center',
                width: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              Sent Friends Request
            </Typography>
            {userData?.relationships?.sentFriendRequests.map(
              (userId, index) => (
                <FriendRequest
                  isDisable={isPressed}
                  key={index.toString()}
                  avatar={
                    userData.users[userId].avatar ||
                    'https://i.imgur.com/An9lt8E.png'
                  }
                  userName={userData.users[userId].username}
                  name={`${userData.users[userId].firstName}  ${userData.users[userId].lastName}`}
                  onCancel={() => onCancelRequest(userId)}
                />
              )
            )}
          </>
        )}
      </ScrollView>

      {userData?.relationships?.receivedFriendRequests.length === 0 &&
        userData?.relationships?.sentFriendRequests.length === 0 && (
          <Typography
            style={{ alignSelf: 'center', position: 'absolute', top: '40%' }}
            color="secondary"
            type="h6"
          >
            You do not have any notifications.
          </Typography>
        )}
    </>
  );
};

export default Notification;
