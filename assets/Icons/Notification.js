import * as React from 'react';
import Svg, { Path, Circle, Text } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const Notification = ({ active, number }) => (
  <Svg
    width={active ? DEVICE.heightP(3.6) : DEVICE.heightP(3.6)}
    height={active ? DEVICE.heightP(3.6) : DEVICE.heightP(3.6)}
    viewBox={active ? '0 0 24 24' : '0 0 26 26'}
    fill={active ? '#323232' : '#A5A5A5'}
  >
    {active ? (
      <Path d="M21.379 16.913A6.698 6.698 0 0119 11.788V9c0-3.519-2.614-6.432-6-6.92V1a1 1 0 10-2 0v1.08C7.613 2.568 5 5.481 5 9v2.788a6.705 6.705 0 01-2.388 5.133A1.752 1.752 0 003.75 20h16.5c.965 0 1.75-.785 1.75-1.75 0-.512-.223-.996-.621-1.337zM12 24a3.756 3.756 0 003.674-3H8.326A3.756 3.756 0 0012 24z" />
    ) : (
      <>
        <Path
          strokeWidth="0.4"
          stroke="#a5a5a5"
          d="M13.5 4.18a.5.5 0 01-.5-.5V2c0-.551-.449-1-1-1s-1 .449-1 1v1.68a.5.5 0 01-1 0V2c0-1.103.897-2 2-2s2 .897 2 2v1.68a.5.5 0 01-.5.5zM12 24c-1.93 0-3.5-1.57-3.5-3.5a.5.5 0 011 0c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5a.5.5 0 011 0c0 1.93-1.57 3.5-3.5 3.5z"
        />
        <Path
          strokeWidth="0.4"
          stroke="#a5a5a5"
          d="M20.5 21h-17a1.502 1.502 0 01-.975-2.64A6.952 6.952 0 005 13.038V10c0-3.86 3.14-7 7-7s7 3.14 7 7v3.038c0 2.053.899 3.99 2.467 5.315A1.501 1.501 0 0120.5 21zM12 4c-3.309 0-6 2.691-6 6v3.038a7.944 7.944 0 01-2.821 6.079A.5.5 0 003.5 20h17a.5.5 0 00.325-.88A7.95 7.95 0 0118 13.038V10c0-3.309-2.691-6-6-6z"
        />
      </>
    )}
    {number > 0 && (
      <>
        <Circle
          cx={active ? 17 : 20}
          cy={active ? 6.5 : 5}
          r={active ? 6.5 : 5}
          fill="#1DA4FE"
        />
        <Text
          x={number > 9 ? (active ? 11 : 15.5) : active ? 14 : 18}
          y={active ? 10 : 7.7}
          fill="#FFF"
          fontSize={active ? '10px' : '7.5px'}
        >
          {number}
        </Text>
      </>
    )}
  </Svg>
);

export default Notification;
