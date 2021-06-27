import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AcceptFriendRequest, Cancel } from '../../assets/Icons';
import { Delete, post } from '../../utils/ApiRequest';
import AuthContext from '../../utils/AuthContext';
import updateUserData from '../../utils/updateUserData';
import Typography from '../Typography';
import styles from './style';

const Friends = ({ data, onAccept }) => {
  const {
    userData,
    userData: {
      relationships: { receivedFriendRequests, sentFriendRequests, friends },
    },
    setUserData,
  } = useContext(AuthContext);
  const [isPressed, setPressed] = useState(false);
  const onSendRequest = (id) => {
    setPressed(true);
    post
      .sendFriendRequest(id)
      .then((payload) => {
        updateUserData.SET_FRIEND_REQUEST({
          setUserData,
          userData,
          messagePayload: payload,
        });
        setPressed(false);
      })
      .catch((error) => console.log(error));
  };

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
        console.log(data);
        setPressed(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          source={{
            uri: data.avatar || 'https://i.imgur.com/An9lt8E.png',
          }}
          rounded
          containerStyle={styles.avatar}
          size="medium"
        />
        <View>
          <Typography type="h5" color="primary">
            {data.username}
          </Typography>
          <View style={styles.userTitles}>
            <Typography type="h7" color="secondary">
              {data.firstName} {data.lastName}
            </Typography>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '30%',
          height: '100%',
          alignItems: 'center',
          justifyContent: onAccept ? 'space-between' : 'flex-end',
        }}
      >
        {!friends.includes(data.id) && !sentFriendRequests.includes(data.id) && (
          <TouchableOpacity
            disabled={isPressed}
            onPress={() =>
              receivedFriendRequests.includes(data.id)
                ? onAcceptRequest(data.id)
                : onSendRequest(data.id)
            }
          >
            <AcceptFriendRequest />
          </TouchableOpacity>
        )}

        {(sentFriendRequests.includes(data.id) ||
          receivedFriendRequests.includes(data.id)) && (
          <TouchableOpacity
            disabled={isPressed}
            onPress={() =>
              sentFriendRequests.includes(data.id)
                ? onCancelRequest(data.id)
                : onRejectRequest(data.id)
            }
          >
            <Cancel />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Friends;
