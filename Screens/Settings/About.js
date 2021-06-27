import React from 'react';
import { View, Linking } from 'react-native';

import Item from './ListItem';
import { Header, Typography } from '../../components';

import styles from './style';

const socialLinks = [
  {
    title: 'Discord',
    url: 'https://discord.gg/hdFfgg7',
  },
  {
    title: 'Youtube',
    url: 'https://www.youtube.com/channel/UCJSjPolz6SiYKvVxFmK-Z1A',
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/PopitalkT',
  },
  {
    title: 'Facebook',
    url: 'https://www.facebook.com/popitalk',
  },
  {
    title: 'Popitalk Team ',
    url: 'https://blog.popitalk.com/',
  },
];

const About = ({ navigation }) => (
  <>
    <Header navigation={navigation} back title="About Popitalk" />
    <Typography
      type="h5"
      color="secondary"
      style={[styles.category, { marginTop: '5%', padding: 0 }]}
    >
      Visit
    </Typography>
    <View style={styles.container}>
      {socialLinks.map(({ title, url }) => (
        <Item key={title} title={title} onPress={() => Linking.openURL(url)} />
      ))}
    </View>
  </>
);

export default About;
