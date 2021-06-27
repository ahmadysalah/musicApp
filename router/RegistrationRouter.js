import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome, Login, SignUp } from '../Screens';

const Stack = createStackNavigator();

const RegestrationRouter = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default RegestrationRouter;
