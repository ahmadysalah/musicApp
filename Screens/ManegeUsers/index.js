/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, DEVICE } from '../../utils/constants';
import {
  Alert,
  Typography,
  SimpleAlert,
  InputText,
  Header,
} from '../../components';
import styles from '../Settings/style';
import Styles from './style';
import { Delete, get, post } from '../../utils/ApiRequest';

const ManageUsers = ({ navigation, route }) => {
  const [search, setSearch] = useState();
  const [pickUser, setPickUser] = useState();
  const [usersData, setUsersData] = useState({ View: [] });
  const [message, setMessage] = useState();
  const { params } = route;
  const toggleModal = () => setPickUser();

  const [menu] = useState(
    params.menu.includes('Followers')
      ? 'members'
      : params.menu.includes('Admins')
      ? 'admins'
      : 'banned'
  );

  useEffect(() => {
    if (search && usersData.View.length) {
      const filteredUsers = usersData.data.filter(
        ({ firstName, lastName, username }) =>
          firstName.includes(search) ||
          lastName.includes(search) ||
          username.includes(search)
      );
      setUsersData({ ...usersData, View: filteredUsers });
    } else setUsersData({ ...usersData, View: usersData.data || [] });
  }, [search]);

  useEffect(() => {
    const usersArray = params.channel[menu] || [];
    if (!usersData.length && usersArray.length)
      get
        .getUsersFromArray(usersArray)
        .then((data) => setUsersData({ data, View: data }))
        .catch(console.log);
  }, []);

  const onConfirmAction = () =>
    (menu === 'admins'
      ? Delete.deleteAdmin
      : menu === 'banned'
      ? Delete.deleteBan
      : post.makeAdmin)(params.channelId, pickUser.id)
      .then(() => {
        setMessage(`${pickUser.username} status was changed`);
        toggleModal();
      })
      .catch(console.log);

  const onCancelAction = () =>
    post
      .addBan(params.channelId, pickUser.id)
      .then(() => setMessage(`${pickUser.username} was banned`))
      .catch(console.log);

  const renderComponent = () => (
    <View style={Styles.userHeader}>
      <Avatar
        rounded
        // size="medium"
        source={{
          uri: pickUser.avatar || 'https://i.imgur.com/An9lt8E.png',
        }}
      />
      <View style={{ marginLeft: 14 }}>
        <Typography type="h6">{pickUser.username}</Typography>
        <Typography type="h7" color="secondary">
          {pickUser.firstName} {pickUser.lastName}
        </Typography>
      </View>
    </View>
  );
  return (
    <>
      <Header title={params.menu} back navigation={navigation} />
      <View style={styles.settingsContainer}>
        <InputText
          value={search}
          onChange={setSearch}
          boxStyle={Styles.searchInput}
          containerStyle={{
            height: 42,
            borderRadius: 15,
            backgroundColor: COLORS.tertiary,
            borderColor: COLORS.highlight,
            borderWidth: 1,
            borderBottomWidth: 1,
          }}
          style={{ padding: 2, borderWidth: 0 }}
          placeholder="Search"
          RightIcon={() =>
            !usersData.View.length && search ? (
              <ActivityIndicator color={COLORS.highlight} />
            ) : (
              <></>
            )
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {usersData.View.map(
            ({ avatar, firstName, lastName, username, id }, index) => (
              <View
                style={[styles.blockedUserContainer, { marginTop: 5 }]}
                key={index.toString()}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.blockedUserCard}
                  onPress={() =>
                    setPickUser({ avatar, firstName, lastName, username, id })
                  }
                >
                  <Avatar
                    rounded
                    size="medium"
                    source={{
                      uri: avatar || 'https://i.imgur.com/An9lt8E.png',
                    }}
                  />
                  <View style={{ marginLeft: '10%' }}>
                    <Typography type="h3">{username}</Typography>
                    <Typography type="h6" color="secondary">
                      {firstName} {lastName}
                    </Typography>
                  </View>
                </TouchableOpacity>
              </View>
            )
          )}
        </ScrollView>
      </View>

      <Alert
        Component={pickUser && renderComponent}
        isModalVisible={!!pickUser}
        onPressCancel={menu !== 'banned' && onCancelAction}
        onPressConfirm={onConfirmAction}
        toggleAlert={toggleModal}
        confirmTitle={
          menu === 'admins'
            ? 'Remove Admin'
            : menu === 'banned'
            ? 'Unban'
            : 'Make Admin'
        }
        deleteTitle="Ban"
        btnWidth={DEVICE.widthP(50)}
        style={{
          height: DEVICE.height * 0.25,
          width: '99%',
          justifyContent: 'space-around',
        }}
        animationIn="zoomInUp"
      />
      <SimpleAlert
        message={message}
        setMessage={setMessage}
        style={{ bottom: 0 }}
      />
    </>
  );
};
export default ManageUsers;
