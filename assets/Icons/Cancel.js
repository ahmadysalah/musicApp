import * as React from 'react';
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const Cancel = () => (
  <Svg
    width={DEVICE.width * 0.12}
    height={DEVICE.width * 0.12}
    viewBox="0 0 38 38"
    fill="none"
  >
    <G filter="url(#filter0_d)">
      <Rect
        x={4}
        y={3}
        width={30}
        height={30}
        rx={15}
        fill="url(#paint0_linear)"
      />
      <Path d="M25.429 19.25H12.57v-2.5H25.43v2.5z" fill="#fff" />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={34}
        y1={33}
        x2={3.8176}
        y2={3.18465}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FC6D5A" />
        <Stop offset={1} stopColor="#FA3535" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Cancel;
