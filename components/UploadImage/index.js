/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

import { Divider } from 'react-native-elements';

import { AsyncStore } from '../../utils/AsyncStorage';
import { patch, post } from '../../utils/ApiRequest';
import { DEVICE } from '../../utils/constants';
import BottomSheet from '../BottomSheet';
import Typography from '../Typography';
import styles from './style';
import Loading from '../Loading';

const PickImage = ({
  active,
  setActive,
  userAvatar,
  navigation,
  setIconUrl,
}) => {
  const [loading, setLoading] = useState(false);

  const getPermission = () =>
    DEVICE.platform !== 'web' &&
    ImagePicker.requestCameraPermissionsAsync().then(({ status }) => {
      if (status === 'granted') return true;
      return false;
    });

  const onPickFromGallery = async () => {
    const permission = await getPermission();
    if (permission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.cancelled) uploadImg(result.uri);
    }
  };

  const onPickFromCamera = async () => {
    const permission = await getPermission();
    if (permission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });
      if (!result.cancelled) uploadImg(result.uri);
    }
  };

  const processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  const uploadImg = async (imageUri) => {
    setLoading(true);
    const { uri } = await processImageAsync(imageUri);
    const uriArray = uri.split('.');
    const fileType = uriArray[uriArray.length - 1];
    const avatar = new FormData();
    avatar.append('avatar', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    try {
      if (userAvatar) {
        const { data } = await patch.updateUserData(avatar);
        await AsyncStore('userData', data);
        navigation.pop();
      }
      if (setIconUrl) {
        const blob = new FormData();
        blob.append('icon', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        setIconUrl({ blob, uri });
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
    setActive(false);
  };

  return (
    <>
      <BottomSheet
        open={active}
        setActive={setActive}
        responsive
        width="93%"
        transparent
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.97}
              onPress={onPickFromGallery}
            >
              <Typography
                color="secondary"
                type="h4"
                style={{ textAlign: 'center' }}
                bold
                onPress={onPickFromGallery}
              >
                Gallery
              </Typography>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              activeOpacity={0.97}
              style={[styles.card]}
              onPress={onPickFromCamera}
            >
              <Typography
                color="secondary"
                type="h4"
                style={{ textAlign: 'center' }}
                bold
              >
                Camera
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={{ height: 10, backgroundColor: 'transparent' }} />
          <TouchableOpacity
            activeOpacity={0.97}
            style={[styles.textFooter, { borderRadius: 13, marginBottom: 15 }]}
            onPress={() => setActive(false)}
          >
            <Typography
              color="secondary"
              type="h4"
              style={{ textAlign: 'center' }}
              bold
            >
              Cancel
            </Typography>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <Loading
        show={loading}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
    </>
  );
};

export default PickImage;
