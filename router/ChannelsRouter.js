import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreateChannel, Search, Channel, ManegeUsers } from '../Screens';

const Stack = createStackNavigator();

const ChannelsRouter = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="createChannel"
  >
    <Stack.Screen name="createChannel" component={CreateChannel} />
    <Stack.Screen name="search" component={Search} />
    <Stack.Screen name="channel" component={Channel} />
    <Stack.Screen name="manageUsers" component={ManegeUsers} />
  </Stack.Navigator>
);

export default ChannelsRouter;
