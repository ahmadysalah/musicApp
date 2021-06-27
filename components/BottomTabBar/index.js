import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Following,
  Explore,
  UsersChat,
  Notification,
  MyChannels,
} from '../../Screens';
import {
  FollowingIcon,
  ExploreIcon,
  ChatIcon,
  NotificationIcon,
  MyChannelsIcon,
} from '../../assets/Icons';
import Typography from '../Typography';
import Header from '../Header';
import styles from './style';
import AuthContext from '../../utils/AuthContext';
import { translate } from '../../language';

const bottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation }) => {
  const {
    unReadMessages,
    userData,
    scrollFollowing,
    scrollExplore,
    scrollChat,
    scrollNotification,
    scrollChannels,
  } = useContext(AuthContext);
  const { state } = navigation.dangerouslyGetState().routes[0];

  return (
    <>
      <Header
        onPressLogo={() => {
          if (
            state === undefined ||
            state.routeNames[state.index] === 'UsersChat'
          ) {
            scrollChat.current.scrollToOffset({ animated: true, offset: 0 });
          } else if (state.routeNames[state.index] === 'Explore') {
            scrollExplore.current.scrollTo({ x: 0, y: 0, animated: true });
          } else if (state.routeNames[state.index] === 'MyChannels') {
            scrollChannels.current.scrollToOffset({
              animated: true,
              offset: 0,
            });
          } else if (state.routeNames[state.index] === 'Following') {
            scrollFollowing.current.scrollTo({ x: 0, y: 0, animated: true });
          } else if (state.routeNames[state.index] === 'Notification') {
            scrollNotification.current.scrollTo({ x: 0, y: 0, animated: true });
          }
        }}
        logo
        search
        navigation={navigation}
      />
      <bottomTab.Navigator
        tabBarOptions={{
          style: styles.tabBarStyle,
          keyboardHidesTabBar: true,
        }}
        initialRouteName="UsersChat"
        shifting={false}
      >
        <bottomTab.Screen
          name="Following"
          component={Following}
          options={{
            tabBarLabel: ({ focused }) => (
              <>
                {focused && (
                  <Typography type="small" style={styles.buttonStyle}>
                    {translate('BottomTapBar.Following')}
                  </Typography>
                )}
              </>
            ),
            tabBarIcon: ({ focused }) => <FollowingIcon active={focused} />,
          }}
        />

        <bottomTab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarLabel: ({ focused }) => (
              <>
                {focused && (
                  <Typography type="small" style={styles.buttonStyle}>
                    {translate('BottomTapBar.Explore')}
                  </Typography>
                )}
              </>
            ),
            tabBarIcon: ({ focused }) => <ExploreIcon active={focused} />,
          }}
        />

        <bottomTab.Screen
          name="UsersChat"
          component={UsersChat}
          options={{
            tabBarLabel: ({ focused }) => (
              <>
                {focused && (
                  <Typography type="small" style={styles.buttonStyle}>
                    {translate('BottomTapBar.Chat')}
                  </Typography>
                )}
              </>
            ),
            tabBarBadgeStyle: styles.badgeStyle,
            tabBarIcon: ({ focused }) => (
              <ChatIcon
                active={focused}
                number={Object.values(unReadMessages).reduce(
                  (acc, current) => acc + current,
                  0
                )}
              />
            ),
          }}
        />

        <bottomTab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarLabel: ({ focused }) => (
              <>
                {focused && (
                  <Typography type="small" style={styles.buttonStyle}>
                    {translate('BottomTapBar.Notification')}
                  </Typography>
                )}
              </>
            ),
            tabBarBadgeStyle: styles.badgeStyle,
            tabBarIcon: ({ focused }) => (
              <NotificationIcon
                active={focused}
                number={userData?.relationships?.receivedFriendRequests.length}
              />
            ),
          }}
        />

        <bottomTab.Screen
          name="MyChannels"
          component={MyChannels}
          options={{
            tabBarLabel: ({ focused }) => (
              <>
                {focused && (
                  <Typography type="small" style={styles.buttonStyle}>
                    {translate('BottomTapBar.MyChannel')}
                  </Typography>
                )}
              </>
            ),
            tabBarIcon: ({ focused }) => <MyChannelsIcon active={focused} />,
          }}
        />
      </bottomTab.Navigator>
    </>
  );
};

export default BottomTabBar;
