import React from 'react';
import { View } from 'react-native';

import { Avatar } from 'react-native-elements';
import { COLORS } from '../../utils/constants';
import { UserIcon } from '../../assets/Icons';
import Typography from '../Typography';

const AvatarBox = ({ viewers, usersNumber, containerStyle, avatarStyle }) => (
  <>
    {viewers && (
      <View style={[{ flexDirection: 'row' }, containerStyle]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <UserIcon color={COLORS.secondary} usersNumber={usersNumber} />
          <Typography
            type="small"
            style={{ marginHorizontal: 5 }}
            color="secondary"
          >
            {usersNumber}
          </Typography>
        </View>
        {viewers.map(
          (data, index) =>
            data !== undefined &&
            (usersNumber >= 10 && index === viewers.length - 4 ? (
              <Avatar
                key={index.toString()}
                title={`${usersNumber - index}+`}
                rounded
                overlayContainerStyle={{
                  backgroundColor: COLORS.secondary,
                }}
                titleStyle={{ fontSize: 12 }}
                containerStyle={[
                  {
                    width: 30,
                    height: 30,
                    zIndex: 1,
                  },
                ]}
              />
            ) : (
              // usersNumber > 10 &&
              index <= 10 && (
                <Avatar
                  key={index.toString()}
                  source={{
                    uri: data.avatar || 'https://i.imgur.com/An9lt8E.png',
                  }}
                  rounded
                  containerStyle={[
                    {
                      marginLeft: index === 0 ? 0 : -10,
                      width: 30,
                      height: 30,
                      zIndex: 1 - index,
                      borderWidth: 2,
                      borderColor: COLORS.tertiary,
                    },
                    avatarStyle,
                  ]}
                />
              )
            ))
        )}
      </View>
    )}
  </>
);
export default AvatarBox;
