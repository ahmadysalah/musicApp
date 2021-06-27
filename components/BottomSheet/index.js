/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { DEVICE } from '../../utils/constants';
import Typography from '../Typography';

import styles from './style';

const BottomSheet = ({
  height,
  width,
  responsive,
  closeInside,
  headerTitle,
  footer,
  open,
  children,
  style,
  setActive,
  transparent,
  overlay,
  transparentOverlay,
}) => {
  const modalizeRef = useRef();

  useEffect(() => {
    open ? onOpen() : onClose();
  }, [open]);

  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => modalizeRef.current?.close();

  const handleChangeStyle = () => {};
  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={height || 200}
      HeaderComponent={
        headerTitle && (
          <View>
            <Typography align="center" type="h3" style={{ marginVertical: 15 }}>
              {headerTitle}
            </Typography>
          </View>
        )
      }
      handlePosition={closeInside ? 'inside' : 'outside'}
      adjustToContentHeight={responsive}
      modalStyle={{
        zIndex: 100,
        width: width || '100%',
        alignSelf: 'center',
        backgroundColor: transparent ? 'transparent' : 'white',
      }}
      closeOnOverlayTap
      overlayStyle={transparentOverlay && { backgroundColor: 'transparent' }}
      withOverlay={overlay}
      closeSnapPointStraightEnabled={false}
      childrenStyle={style}
      FooterComponent={footer}
      modalHeight={!responsive && DEVICE.height * 0.82}
      children={children}
      onPositionChange={handleChangeStyle}
      onClosed={() => setActive(false)}
    />
  );
};
export default BottomSheet;
