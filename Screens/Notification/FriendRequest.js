/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AcceptFriendRequest, Cancel } from '../../assets/Icons';
import { Typography } from '../../components';
import styles from './style';

const friendRequest = ({
  avatar,
  userName,
  name,
  onCancel,
  onAccept,
  isDisable,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Avatar
        source={{
          uri: avatar,
        }}
        rounded
        containerStyle={styles.avatar}
        size="medium"
      />

      <View>
        <View style={styles.userTitles}>
          <Typography type="h5" color="primary">
            {userName}
          </Typography>
        </View>
        <Typography type="h7" color="secondary">
          {name}
        </Typography>
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
      {onAccept && (
        <TouchableOpacity disabled={isDisable} onPress={onAccept}>
          <AcceptFriendRequest />
        </TouchableOpacity>
      )}
      {onCancel && (
        <TouchableOpacity disabled={isDisable} onPress={onCancel}>
          <Cancel />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default friendRequest;
