import * as React from 'react';
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const DeleteIcon = () => (
  <Svg width={36} height={32} viewBox="0 0 36 32" fill="none">
    <G filter="url(#filter0_d)">
      <Rect
        x={4}
        y={3}
        width={28}
        height={24}
        rx={10}
        fill="url(#paint0_linear)"
      />
      <Path d="M24 16H12v-2h12v2z" fill="#fff" />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={32}
        y1={27}
        x2={8.09341}
        y2={-0.551834}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FC6D5A" />
        <Stop offset={1} stopColor="#FA3535" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default DeleteIcon;
