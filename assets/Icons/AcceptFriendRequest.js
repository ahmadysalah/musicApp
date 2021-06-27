import * as React from 'react';
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const AcceptFriendRequest = () => (
  <Svg
    width={DEVICE.width * 0.12}
    height={DEVICE.width * 0.12}
    viewBox="0 0 34 34"
    fill="none"
  >
    <G filter="url(#filter0_d)">
      <Circle cx={16} cy={16} r={15} fill="url(#paint0_linear)" />
    </G>
    <Path
      d="M18.203 16.577c1.622 0 2.937-1.42 2.937-3.173 0-1.752-1.315-3.173-2.937-3.173-1.622 0-2.937 1.42-2.937 3.173 0 1.752 1.315 3.173 2.937 3.173zM18.203 22.923s5.874 0 5.874-1.586c0-1.904-2.864-3.967-5.874-3.967s-5.874 2.063-5.874 3.967c0 1.586 5.874 1.586 5.874 1.586zm-6.609-7.932v-2.38h-1.468v2.38H7.923v1.586h2.203v2.38h1.468v-2.38h2.203v-1.586h-2.203z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={31}
        y1={1}
        x2={1}
        y2={31}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5ABEFC" />
        <Stop offset={1} stopColor="#009DFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AcceptFriendRequest;
