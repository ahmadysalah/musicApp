import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const UserIcon = ({ color }) => (
  <Svg
    width={18}
    height={20}
    viewBox="0 0 24 30"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="prefix__feather prefix__feather-users"
  >
    <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <Circle cx={9} cy={7} r={4} />
    <Path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </Svg>
);

export default UserIcon;
