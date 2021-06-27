import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const { widthP } = DEVICE;
const Leave = () => (
  <Svg width={widthP(6)} height={widthP(6)} viewBox="0 0 12.7 12.7">
    <Path
      d="M7.056 285.711h-4.94v9.878h4.94v-.706H2.822v-8.466h4.234z"
      transform="translate(0 -284.3)"
      fill="black"
      fillOpacity={1}
      stroke="none"
      strokeWidth=".7055555px"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeOpacity={1}
    />
    <Path
      d="M4.233 289.944h4.94l-2.117-2.116.705-.706 3.528 3.528-3.528 3.528-.705-.706 2.116-2.116H4.233z"
      transform="translate(0 -284.3)"
      opacity={1}
      vectorEffect="none"
      fill="red"
      fillOpacity={1}
      stroke="none"
      strokeWidth=".7055555px"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={4}
      strokeDasharray="none"
      strokeDashoffset={0}
      strokeOpacity={1}
    />
  </Svg>
);

export default Leave;
