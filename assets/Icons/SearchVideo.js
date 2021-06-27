import * as React from 'react';
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SearchVideo = ({ onPress }) => (
  <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" onPress={onPress}>
    <G filter="url(#filter0_d)">
      <Circle cx={21} cy={20} r={17} fill="url(#paint0_linear)" />
    </G>
    <Path
      d="M24.006 21.805h-.633l-.224-.216a5.18 5.18 0 001.257-3.386 5.203 5.203 0 10-5.203 5.203 5.18 5.18 0 003.386-1.257l.216.224v.633L26.807 27 28 25.807l-3.994-4.002zm-4.803 0a3.597 3.597 0 01-3.602-3.602 3.597 3.597 0 013.602-3.602 3.597 3.597 0 013.602 3.602 3.597 3.597 0 01-3.602 3.602z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={38}
        y1={3}
        x2={4}
        y2={37}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#98E4FA" />
        <Stop offset={1} stopColor="#00C3FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SearchVideo;
