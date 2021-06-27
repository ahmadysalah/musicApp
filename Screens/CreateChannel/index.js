/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, CheckBox } from 'react-native-elements';

import { patch, post } from '../../utils/ApiRequest';
import {
  Header,
  Typography,
  InputText,
  Button,
  SimpleAlert,
  UploadImage,
  Image,
  Loading,
} from '../../components';
import styles from './style';
import { COLORS } from '../../utils/constants';

const CreateChannel = ({ navigation, route }) => {
  const [channelName, setChannelName] = useState();
  const [channelDescription, setChannelDescription] = useState();
  const [publicChannel, setPublic] = useState(true);
  const [channelImage, setChannelImage] = useState();
  const [message, setMessage] = useState();
  const { params } = route;
  const [showUploadIcon, setShowUpload] = useState(false);
  const [icon, setEditIcon] = useState();
  const [Load, setLoading] = useState(false);

  useEffect(() => {
    if (params) {
      setChannelName(params.channel.name);
      setChannelDescription(params.channel.description);
      setPublic(params.channel.public);
      setChannelImage(params.channel.icon);
    }
  }, []);
  const onCreateChannel = async () => {
    try {
      setLoading(true);
      if (icon) {
        const { blob } = icon;
        blob.append('name', channelName);
        blob.append('description', channelDescription);
        blob.append('public', publicChannel);
        await post.createChannel({}, blob);
      } else {
        await post.createChannel({
          channelName,
          channelDescription,
          publicChannel,
        });
      }
      setMessage(`${channelName} was created successfully`);
      setChannelName();
      setChannelDescription();
      setPublic(true);
      setEditIcon();
    } catch (error) {
      console.log(error.response);
      setMessage('Check Your Data Please');
    }
    setLoading(false);
  };

  const onEditChannel = async () => {
    try {
      setLoading(true);
      if (icon) {
        /// / get blob from uploaded icon
        const { blob } = icon;
        /// check if there any change in channel name to add it ain formdata
        params.channel.name !== channelName && blob.append('name', channelName);
        /// check if there any change in channel channelDescription to add it ain formdata
        params.channel.description !== channelDescription &&
          blob.append('description', channelDescription);
        blob.append('public', publicChannel);
        await patch.updateChannel(params.channelId, blob);
      } else {
        await patch.updateChannel(params.channelId, {
          name: channelName,
          description: channelDescription,
          public: publicChannel,
        });
      }
      setMessage(`${channelName} was update successfully`);
    } catch (error) {
      setMessage('Check Your Data Please');
      console.log(error.response);
    }
    setLoading(false);
  };
  return (
    <>
      <Header
        title={params && 'Channel Settings'}
        back
        onPressBack={() => navigation.pop()}
      />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {!params && (
            <>
              <Typography bold>Create your own channel</Typography>
              <Typography
                type="h7"
                color="secondary"
                style={styles.description}
              >
                Creating a channel allows you to create your own community on
                Popitalk.
              </Typography>
            </>
          )}
          <Avatar
            avatarStyle={{ backgroundColor: COLORS.tertiary }}
            rounded
            style={{ width: 120, height: 120 }}
          >
            <Image
              source={{
                uri: icon
                  ? icon.uri
                  : channelImage || 'https://i.imgur.com/7eDW5IH.png',
              }}
              style={{ width: 120, height: 120 }}
              rounded
            />
            <Avatar.Accessory size={25} onPress={() => setShowUpload(true)} />
          </Avatar>

          <Typography type="h5" color="highlight">
            Select channel picture
          </Typography>
          <InputText
            placeholder="Name your channel"
            label="Channel Name"
            value={channelName}
            onChange={setChannelName}
          />
          <InputText
            placeholder="Describe your channel"
            label="Channel Description"
            value={channelDescription}
            onChange={setChannelDescription}
            numberOfLines={5}
            style={{ textAlignVertical: 'top' }}
            multiline
          />
          <CheckBox
            title="Private"
            checked={!publicChannel}
            checkedColor={COLORS.highlight}
            onPress={() => setPublic(!publicChannel)}
            containerStyle={{
              alignSelf: 'flex-start',
              backgroundColor: 'transparent',
              marginLeft: '-3%',
              marginTop: '-8%',
            }}
          />
          <Button
            title={params ? 'Save' : 'Create!'}
            onPress={params ? onEditChannel : onCreateChannel}
            width="80%"
            height={40}
            disabled={!(channelDescription && channelName)}
          />
        </View>
      </KeyboardAwareScrollView>
      <SimpleAlert message={message} setMessage={setMessage} />
      <UploadImage
        active={showUploadIcon}
        setActive={setShowUpload}
        navigation={navigation}
        setIconUrl={setEditIcon}
      />
      <Loading show={Load} size={50} fullScreen />
    </>
  );
};
export default CreateChannel;
