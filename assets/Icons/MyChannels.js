import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const MyChannels = ({ active }) => (
  <Svg
    width={active ? DEVICE.heightP(3.6) : DEVICE.heightP(3.6)}
    height={active ? DEVICE.heightP(3.6) : DEVICE.heightP(3.6)}
    viewBox="0 0 512.005 512.005"
    fill={active ? '#323232' : '#A5A5A5'}
  >
    <Path
      strokeWidth={active ? '15' : '0'}
      stroke="#323232"
      d="M467.002 120.001h-181l72-96c4.971-6.627 3.627-16.029-3-21s-16.03-3.627-21 3l-79.623 106.164-77.771-77.771c-5.857-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l64.394 64.394H45.002c-24.813 0-45 20.187-45 45v242c0 24.813 20.187 45 45 45h66.729l-19.146 38.292c-3.705 7.41-.701 16.419 6.708 20.125 7.424 3.712 16.427.688 20.125-6.708l25.854-51.708h222.459l25.854 51.708c3.705 7.412 12.716 10.413 20.124 6.708 7.41-3.705 10.413-12.715 6.708-20.125l-19.146-38.292h65.73c24.813 0 45-20.187 45-45v-242c.001-24.813-20.185-45-44.999-45zm15 287c0 8.271-6.729 15-15 15h-422c-8.271 0-15-6.729-15-15v-242c0-8.271 6.729-15 15-15h422c8.271 0 15 6.729 15 15z"
    />
  </Svg>
);

export default MyChannels;