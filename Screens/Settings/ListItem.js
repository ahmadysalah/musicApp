import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import styles from './style';

const ListItems = ({
  title,
  content,
  avatar,
  titleStyle,
  onPress,
  column,
  icon,
  Icon,
}) => (
  <ListItem
    bottomDivider
    containerStyle={styles.card}
    onPress={onPress}
    activeOpacity={0.99}
  >
    {avatar && (
      <Avatar onPress={onPress} rounded size="medium" source={{ uri: avatar }}>
        <Avatar.Accessory />
      </Avatar>
    )}
    <ListItem.Content
      style={[styles.item, column && { flexDirection: 'column' }]}
    >
      <ListItem.Title style={titleStyle}>{title}</ListItem.Title>
      {content && <ListItem.Title right>{content}</ListItem.Title>}
    </ListItem.Content>
    {icon && <ListItem.Chevron />}
    {Icon && <Icon />}
  </ListItem>
);

export default ListItems;
