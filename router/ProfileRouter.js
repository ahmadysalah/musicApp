import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Settings,
  Profile,
  UpdateProfile,
  About,
  BlockedUser,
} from '../Screens';

const Stack = createStackNavigator();

const ProfileRouter = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="profile" component={Profile} />
    <Stack.Screen name="settings" component={Settings} />
    <Stack.Screen name="updateProfile" component={UpdateProfile} />
    <Stack.Screen name="about" component={About} />
    <Stack.Screen name="block" component={BlockedUser} />
  </Stack.Navigator>
);

export default ProfileRouter;
