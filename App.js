import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { onChangLanguage, translate } from './language';
import { GetFromStore, AsyncStore } from './utils/AsyncStorage';
import { NotoSansRegular, NotoSansBold } from './assets/Fonts';

import { ProfileRouter, ChannelsRouter, RegistrationRouter } from './router';

import AuthContext from './utils/AuthContext';
import BottomTabBar from './components/BottomTabBar';
import { get } from './utils/ApiRequest';
import { Chat } from './Screens';
import { socketFunction } from './utils/Socket';

const Stack = createStackNavigator();

const App = () => {
  const [userData, setUserData] = useState(false);
  const [language, setLanguage] = useState(translate('language'));
  const [refreshSocket, setRefreshSocket] = useState(true);
  const [socketMessageType, setSocketMessageType] = useState();
  const [socketPayload, setSocketPayload] = useState();
  const [unReadMessages, setUnReadMessages] = useState({});
  const [onlineFriends, setOnlineFriends] = useState([]);
  const scrollFollowing = useRef(null);
  const scrollExplore = useRef(null);
  const scrollChat = useRef(null);
  const scrollNotification = useRef(null);
  const scrollChannels = useRef(null);

  const TASK_NAME = 'BACKGROUND_TASK';

  // add context data with memo
  const authContext = React.useMemo(() => ({
    signIn: (logUserData) => setUserData(logUserData),
    signOut: () => setUserData(),
    changeLanguage: async (newLanguage) => {
      await onChangLanguage(newLanguage);
      setLanguage(newLanguage);
    },
  }));

  // load the fonts
  const [fontsLoaded] = useFonts({ NotoSansRegular, NotoSansBold });

  // run the function in background TaskManager
  TaskManager.defineTask(TASK_NAME, () => {
    try {
      if (userData) {
        return socketFunction({
          userData,
          setUserData,
          setSocketMessageType,
          setSocketPayload,
          setOnlineFriends,
          onlineFriends,
          updateReadMessages,
          setRefreshSocket,
          refreshSocket,
          runNotification: true,
        })
          ? BackgroundFetch.Result.NewData
          : BackgroundFetch.Result.NoData;
      }
      return true;
    } catch (err) {
      return BackgroundFetch.Result.Failed;
    }
  });

  // register background task and this function run in first time in run the app
  const RegisterBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 1,
        startOnBoot: true,
        stopOnTerminate: false,
      });
      console.log('Task registered');
    } catch (err) {
      console.log('Task Register failed:', err);
    }
  };

  // run in the first time
  useEffect(() => {
    RegisterBackgroundTask();
    if (!userData) {
      GetFromStore('userData').then(async (data) => {
        if (data) {
          const userMessages = await GetFromStore('unReadMessages');
          setUnReadMessages(userMessages || {});
          setUserData(data);
          get
            .refreshSessions()
            .then((clientData) => {
              setUserData(clientData.data);
            })
            .catch(authContext.signOut);
        }
      });
      GetFromStore('unReadMessages')
        .then((data) => setUnReadMessages(data || {}))
        .catch((error) => console.log(error));
    }
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;
  }, []);

  // update read message to be unread
  const updateReadMessages = async (channelId) => {
    try {
      setUnReadMessages((lastMessages) => ({
        ...lastMessages,
        [channelId]: lastMessages[channelId] ? lastMessages[channelId] + 1 : 1,
      }));
      await AsyncStore('unReadMessages', {
        ...unReadMessages,
        [channelId]: unReadMessages[channelId]
          ? unReadMessages[channelId] + 1
          : 1,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (userData && refreshSocket) {
      // run the socket function if user already login
      socketFunction({
        userData,
        setUserData,
        setSocketMessageType,
        setSocketPayload,
        setOnlineFriends,
        onlineFriends,
        updateReadMessages,
        setRefreshSocket,
        runNotification: false,
      });
    }
  }, [userData, refreshSocket]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        language,
        authContext,
        userData,
        socketMessageType,
        socketPayload,
        setSocketPayload,
        setUserData,
        unReadMessages,
        onlineFriends,
        setUnReadMessages,
        scrollFollowing,
        scrollExplore,
        scrollChat,
        scrollNotification,
        scrollChannels,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userData ? (
            <>
              <Stack.Screen name="Home" component={BottomTabBar} />
              <Stack.Screen name="profile" component={ProfileRouter} />
              <Stack.Screen name="channels" component={ChannelsRouter} />
              <Stack.Screen name="chat" component={Chat} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="registration"
                component={RegistrationRouter}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
