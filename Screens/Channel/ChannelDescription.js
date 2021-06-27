import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Typography, Button } from '../../components';
import { Delete, get, post } from '../../utils/ApiRequest';
import { DEVICE } from '../../utils/constants';
import styles from './style';

const Channel = ({ channel, isMember, refreshChannel }) => {
  const [adminsAvatarUrl, setAdminsUrl] = useState(false);

  useEffect(() => {
    if (channel) {
      channel.admins.map(async (admin) => {
        const {
          data: { avatar },
        } = await get.getUserById(admin);
        setAdminsUrl([avatar]);
      });
    }
  }, [channel]);

  const followChannel = async () => {
    isMember
      ? await Delete.unFollowChannel(channel.id)
      : await post.followChannel(channel.id);
    await refreshChannel();
  };

  return channel ? (
    <>
      <View style={styles.channelProfile}>
        <View style={styles.profileSection}>
          <Avatar source={{ uri: channel.icon }} size="large" rounded />
        </View>
        <View style={styles.descriptionSection}>
          <Typography type="h5" style={styles.channelTitle} bold>
            {channel.name}
          </Typography>
          <View style={styles.adminSection}>
            <Typography type="h8" bold>
              Admins
            </Typography>
            {adminsAvatarUrl &&
              adminsAvatarUrl.map((avatar, index) => (
                <Avatar
                  key={index.toString()}
                  source={{ uri: avatar }}
                  rounded
                  size="small"
                  containerStyle={styles.adminAvatar}
                />
              ))}
          </View>
          <Typography type="h8">{channel.description}</Typography>
        </View>
        <Button
          title={isMember ? 'Unfollow' : 'Follow'}
          width={DEVICE.width / 3}
          height={DEVICE.width / 11}
          radius={10}
          // style={{ alignSelf: 'flex-end' }}
          buttonTextStile={{ fontSize: 15 }}
          onPress={followChannel}
        />
      </View>
    </>
  ) : (
    <></>
  );
};
export default Channel;
