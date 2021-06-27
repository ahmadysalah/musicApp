import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AuthContext from '../../utils/AuthContext';
import ListItem from '../../Screens/Settings/ListItem';
import { AddUser, BackArrow } from '../../assets/Icons';
import styles from './style';
import Button from '../Button';
import Typography from '../Typography';

const Room = ({ friends, setUsers, users, createRoom, closePage }) => {
  const { userData } = useContext(AuthContext);

  const RenderUser = ({ item, index }) => {
    const isInRoom = users.includes(item);

    return (
      <ListItem
        key={index.toString()}
        avatar={
          userData.users[item].avatar || 'https://i.imgur.com/An9lt8E.png'
        }
        title={userData.users[item].username}
        content={`${userData.users[item].firstName} ${userData.users[item].lastName}`}
        column
        Icon={() =>
          !isInRoom ? (
            <AddUser size="small" />
          ) : (
            <Animatable.Text
              style={{ color: 'green', marginHorizontal: 10 }}
              animation="fadeIn"
            >
              ✔
            </Animatable.Text>
          )
        }
        onPress={() =>
          isInRoom
            ? setUsers(users.filter((e) => e !== item))
            : setUsers([item, ...users])
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity onPress={closePage}>
          <BackArrow />
        </TouchableOpacity>
        <Typography style={{ marginHorizontal: 10 }}>Select friends</Typography>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* renderItem={RenderUser} */}
        {/* keyExtractor={(item, index) => index.toString()}
        data={friends} */}
        {friends && friends.map((item, index) => RenderUser({ item, index }))}
      </ScrollView>

      <Button
        title="Create"
        width="50%"
        height={50}
        style={{ alignSelf: 'center' }}
        onPress={createRoom}
        disabled={users.length <= 1}
      />
    </View>
  );
};
export default Room;
