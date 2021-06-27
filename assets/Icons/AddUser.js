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
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const AddUser = ({ size }) => (
  <Svg
    width={size === 'small' ? 30 : DEVICE.widthP(13)}
    height={DEVICE.widthP(13)}
    viewBox="0 0 43 43"
    fill="none"
  >
    <G filter="url(#filter0_d)">
      <Circle cx={21.5} cy={19.5} r={17.5} fill="url(#paint0_linear)" />
    </G>
    <Path
      d="M24.09 19c1.91 0 3.456-1.566 3.456-3.5S26 12 24.09 12s-3.455 1.566-3.455 3.5 1.546 3.5 3.455 3.5zm-7.772-1.75v-2.625h-1.727v2.625H12V19h2.59v2.625h1.728V19h2.591v-1.75h-2.59zm7.773 3.5c-2.306 0-6.91 1.172-6.91 3.5V26H31v-1.75c0-2.328-4.603-3.5-6.91-3.5z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={39}
        y1={2}
        x2={-0.49471}
        y2={8.15396}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5ABEFC" />
        <Stop offset={1} stopColor="#009DFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AddUser;
