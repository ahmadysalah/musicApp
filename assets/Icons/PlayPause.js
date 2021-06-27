import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Pause = ({ onPress }) => (
  <Svg width={39} height={39} viewBox="0 0 39 39">
    <Circle cx={19.5} cy={19.5} r={19.5} fill="#000" fillOpacity={0.4} />
    <Path
      d="M29.09 21.125L14.774 29.74c-1.215.73-2.774-.154-2.774-1.626V10.886c0-1.47 1.557-2.356 2.774-1.624l14.316 8.614c.276.163.506.4.666.685a1.925 1.925 0 010 1.879c-.16.285-.39.522-.666.685z"
      fill="#fff"
    />
  </Svg>
);

export default Pause;
