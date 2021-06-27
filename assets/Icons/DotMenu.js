import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const { widthP } = DEVICE;
const DotMenu = ({ color }) => (
  <Svg
    width={widthP(5.8)}
    height={widthP(5.8)}
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    fill={color}
  >
    <Path d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 26c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 6c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z" />
  </Svg>
);

export default DotMenu;
