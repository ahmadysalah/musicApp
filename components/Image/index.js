import React from 'react';
import ReactNative from 'react-native';
import { Image } from 'react-native-elements';

import { COLORS, DEVICE } from '../../utils/constants';

const ImageComponent = ({
  source,
  uri,
  height,
  width,
  rounded,
  onPress,
  style,
  border,
  mode,
  disableLoading,
  Mode,
  props,
  // import image from element if get props from uri
}) =>
  source ? (
    <ReactNative.Image
      source={source}
      style={[
        // height will be 1/5 from device as initial
        {
          height: height || DEVICE.height / 5,
          width: width || DEVICE.height / 5,
        },
        // you can send border color as props to render image border
        border && { borderWidth: 1, borderColor: COLORS[border] },
        // you can send rounded as boolean props to rounded the image
        rounded && {
          borderRadius: typeof rounded === 'boolean' ? 100 : rounded,
        },
        style,
      ]}
      resizeMode={Mode}
      onPress={onPress}
      {...props}
    />
  ) : (
    <Image
      source={uri && { uri }}
      style={[
        // height will be 1/5 from device as initial
        {
          height: height || DEVICE.height / 5,
          width: width || DEVICE.height / 5,
        },
        // you can send border color as props to render image border
        border && { borderWidth: 1, borderColor: COLORS[border] },
        // you can send rounded as boolean props to rounded the image
        rounded && {
          borderRadius: typeof rounded === 'boolean' ? 100 : rounded,
        },
        style,
      ]}
      resizeMode={mode || 'center'}
      // render the loading component as indicator before load images
      PlaceholderContent={
        !disableLoading && <ReactNative.ActivityIndicator size="small" />
      }
      placeholderStyle={{ justifyContent: 'center' }}
      onPress={onPress}
      // fade animation to improve view for image
      transition
    />
  );

export default ImageComponent;
