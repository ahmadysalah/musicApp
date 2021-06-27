import React, { useContext, useEffect, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';

import { Divider } from 'react-native-elements';
import { post } from '../../utils/ApiRequest';
import authContext from '../../utils/AuthContext';
import { Header, Typography, UploadImage, BottomSheet } from '../../components';
import { COLORS } from '../../utils/constants';
import { GetFromStore, DeleteStore } from '../../utils/AsyncStorage';
import { deleteSecureToken } from '../../utils/SecureStorege';
import { confirmationAlert } from '../../utils/helperFunction';
import Item from './ListItem';

import styles from './style';
import { translate } from '../../language';

const Settings = ({ navigation, route }) => {
  const [userData] = useState(route.params.syncUserData);
  const [AsyncUserData, setAsyncData] = useState();
  const [showLanguageBS, setShowBS] = useState(false);
  const [listItems, setListItems] = useState([
    { title: 'Name' },
    { title: 'Birthday' },
    { title: 'Email' },
  ]);
  const [editAvatar, setEditAvatar] = useState(false);

  const {
    authContext: { signOut, changeLanguage },
  } = useContext(authContext);

  const handleChangeLanguage = async (newLanguage) => {
    setShowBS(false);
    await changeLanguage(newLanguage);
  };

  useEffect(() => {
    GetFromStore('userData').then((AsyncUserData) => {
      setAsyncData(AsyncUserData);
      setListItems([
        {
          title: 'Name',
          data: `${userData.firstName} ${userData.lastName}`,
          onPress: () =>
            navigation.push('updateProfile', { userData, title: 'Name' }),
        },
        {
          title: 'Birthday',
          data: AsyncUserData.dateOfBirth.split('T')[0],
          onPress: () =>
            navigation.push('updateProfile', {
              AsyncUserData,
              title: 'Birthday',
            }),
        },
        {
          title: 'Email',
          data: AsyncUserData.email,
          onPress: () =>
            navigation.push('updateProfile', { AsyncUserData, title: 'Email' }),
        },
      ]);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await post.signOut();
      await deleteSecureToken();
      await DeleteStore();
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        navigation={navigation}
        back
        title={translate('SettingsScreen.ScreenTittle')}
      />
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <Item
          avatar={userData.avatar || 'https://i.imgur.com/An9lt8E.png'}
          title={userData.username}
          onPress={() => setEditAvatar(true)}
        />
        <Typography type="h6" color="secondary" style={styles.category}>
          {translate('SettingsScreen.Information')}
        </Typography>

        {listItems.map((item) => (
          <Item
            key={item.title}
            title={item.title}
            content={item.data}
            icon
            onPress={item.onPress}
          />
        ))}

        <Typography type="h6" color="secondary" style={styles.category}>
          Security
        </Typography>
        <Item
          title="Change password"
          icon
          onPress={() =>
            navigation.push('updateProfile', {
              AsyncUserData,
              title: 'Password',
            })
          }
        />

        <Typography type="h6" color="secondary" style={styles.category}>
          Company
        </Typography>
        <Item
          title="About Popitalk"
          icon
          onPress={() => navigation.push('about')}
        />

        <Typography type="h6" color="secondary" style={styles.category}>
          Legal
        </Typography>
        <Item
          title="Terms of Use"
          onPress={() => Linking.openURL('https://blog.popitalk.com/')}
        />
        <Item
          title="Privacy Policy"
          onPress={() => Linking.openURL('https://blog.popitalk.com/')}
        />

        <Typography type="h6" color="secondary" style={styles.category}>
          Actions
        </Typography>

        <Item
          title="Blocked Users"
          icon
          onPress={() => navigation.push('block')}
        />
        <Item title="Change Language" onPress={() => setShowBS(true)} />
        <Item
          title="Log out"
          titleStyle={{ color: COLORS.error }}
          onPress={() =>
            confirmationAlert('Log Out', 'Are You Sure!!', handleLogout)
          }
        />
      </ScrollView>

      <UploadImage
        active={editAvatar}
        setActive={setEditAvatar}
        userAvatar
        navigation={navigation}
      />

      <BottomSheet
        responsive
        open={showLanguageBS}
        setActive={setShowBS}
        transparent
        width="90%"
      >
        <View style={styles.sheetContainer}>
          <Typography
            color="secondary"
            type="h4"
            children="English"
            style={styles.sheetCard}
            activeOpacity={0.97}
            onPress={() => handleChangeLanguage('en')}
          />
          <Divider />

          <Typography
            color="secondary"
            type="h4"
            style={styles.sheetCard}
            children="한국어"
            onPress={() => handleChangeLanguage('ko')}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default Settings;
