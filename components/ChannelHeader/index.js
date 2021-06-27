import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import { Avatar } from 'react-native-elements';
import { Settings, BackArrow } from '../../assets/Icons';
import Typography from '../Typography';
import styles from './style';

const ChannelHeader = ({
  avatar,
  ChannelName,
  setMenu,
  menu,
  navigation,
  isAdmin,
}) => (
  <SafeAreaView style={styles.SafeArea}>
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        <BackArrow
          onPress={() => (menu === 2 ? setMenu(0) : navigation.pop())}
        />
      </View>
      <View style={styles.channelTitle}>
        <Avatar size="small" source={{ uri: avatar }} rounded />
        <Typography
          type="h4"
          color="primary"
          bold
          style={{ flexGrow: 2, marginLeft: 10 }}
        >
          {ChannelName}
        </Typography>
      </View>
      <View style={styles.rightIcon}>
        {isAdmin && (
          <TouchableOpacity onPress={() => setMenu(2)}>
            <Settings gradient={menu === 2} style={styles.controlsStyle} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  </SafeAreaView>
);

export default ChannelHeader;
