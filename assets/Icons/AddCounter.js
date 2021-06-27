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
const AddCounter = ({ onPress, small }) => (
  <Svg
    width={small ? 30 : 45}
    height={small ? 30 : 45}
    viewBox="0 0 32 32"
    fill="none"
    onPress={onPress}
  >
    <G filter="url(#filter0_d)">
      <Circle
        cx={14.7455}
        cy={14.7455}
        r={13.7455}
        fill="url(#paint0_linear)"
      />
    </G>
    <Path
      d="M14.745 10.164v9.163M10.164 14.745h9.163"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={28.4909}
        y1={1}
        x2={-2.53039}
        y2={5.83365}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5ABEFC" />
        <Stop offset={1} stopColor="#009DFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AddCounter;
