import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import Typography from '../Typography';
import Button from '../Button';
import { COLORS } from '../../utils/constants';

const Alert = ({
  isModalVisible,
  onPressCancel,
  onPressConfirm,
  title,
  content,
  animationIn,
  animationOut,
  toggleAlert,
  Component,
  confirmTitle,
  deleteTitle,
  btnHeight,
  btnWidth,
  style,
  simpleAlert,
}) => (
  <Modal
    onModalWillShow={() => simpleAlert && setTimeout(() => toggleAlert(), 500)}
    animationIn={simpleAlert ? 'fadeInUp' : animationIn || 'tada'}
    animationOut={simpleAlert ? 'fadeOutDown' : animationOut || 'zoomOutDown'}
    hasBackdrop
    backdropOpacity={0.2}
    isVisible={isModalVisible}
    style={styles.modal}
    onBackdropPress={toggleAlert}
    onSwipeComplete={toggleAlert}
    swipeDirection="down"
  >
    <View
      style={[
        styles.content,
        simpleAlert && {
          height: 'auto',
          padding: 5,
          top: '40%',
          width: '90%',
        },
        style,
      ]}
    >
      {Component && <Component />}
      <Typography type={simpleAlert ? 'h5' : 'h3'} color="border">
        {title}
      </Typography>
      {content && (
        <Typography type="h5" color="secondary" align="center">
          {content}
        </Typography>
      )}
      {onPressConfirm && (
        <Button
          title={confirmTitle || 'OK'}
          onPress={onPressConfirm}
          width={btnWidth || 117}
          height={btnHeight || 39}
        />
      )}
      {onPressCancel && (
        <Button
          color="cancel"
          title={deleteTitle || 'Delete'}
          onPress={onPressCancel}
          width={btnWidth || 117}
          height={btnHeight || 39}
          style={{ marginTop: 15 }}
        />
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  content: {
    height: '28%',
    backgroundColor: COLORS.tertiary,
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '5%',
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 10,
  },
});

export default Alert;
