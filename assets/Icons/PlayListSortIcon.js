import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlayListIco = ({ color }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 405.333 405.333"
    fill="none"
    style={{ marginHorizontal: 11 }}
  >
    <Path fill={color} d="M0 53.333h256V96H0zM0 138.667h256v42.667H0z" />
    <Path
      fill={color}
      d="M298.667 53.333v174.613c-6.72-2.453-13.76-3.947-21.333-3.947-35.307 0-64 28.693-64 64s28.693 64 64 64 64-28.693 64-64V96h64V53.333H298.667zM0 224h170.667v42.667H0z"
    />
  </Svg>
);

export default PlayListIco;
