import React, { useContext } from 'react';
import {
  Image,
  Share,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthContext from '../../utils/AuthContext';
import Typography from '../Typography';
import {
  BackArrow,
  Settings,
  SearchIcon,
  InviteFriends,
} from '../../assets/Icons';
import { logo } from '../../assets/Images';
import styles from './style';

const Header = ({
  navigation,
  back,
  onPressBack,
  title,
  setting,
  search,
  RightIcon,
  rightIconOnPress,
  onPressLogo,
}) => {
  const { userData } = useContext(AuthContext);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Poopitalk application you can download application for android from : https://popitalk.com/  for ios from : https://popitalk.com/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={(styles.headerLayout, search && { backgroundColor: '#fff' })}
    >
      {!search && (
        <View style={styles.headerVisible}>
          {back && (
            <BackArrow onPress={onPressBack || (() => navigation.pop())} />
          )}
          {title && <Typography type="h4"> {title}</Typography>}
          {RightIcon && !search ? (
            <RightIcon onPress={rightIconOnPress} />
          ) : (
            <Typography />
          )}
        </View>
      )}
      {search && (
        <View style={styles.headerVisible}>
          <TouchableOpacity onPress={onPressLogo} style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Typography type="h3" bold>
              Popitalk
            </Typography>
          </TouchableOpacity>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={onShare}
              style={styles.optionButtonStyle}
            >
              <InviteFriends />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('channels', { screen: 'search' })
              }
              style={styles.optionButtonStyle}
            >
              <SearchIcon style={styles.searchButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
              <Image
                source={{
                  uri: userData.avatar || 'https://i.imgur.com/An9lt8E.png',
                }}
                style={styles.user}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {setting && <Settings onPress={setting} />}
    </SafeAreaView>
  );
};
export default Header;
