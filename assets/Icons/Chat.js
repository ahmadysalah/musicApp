import * as React from 'react';
import Svg, { Path, Circle, Text } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const Chat = ({ active, number }) => (
  <Svg
    width={active ? DEVICE.heightP(3.9) : DEVICE.heightP(3.9)}
    height={active ? DEVICE.heightP(3.9) : DEVICE.heightP(3.9)}
    viewBox="0 0 53 48"
    fill={active ? '#323232' : '#A5A5A5'}
  >
    {active ? (
      <Path d="M24 4C12.972 4 4 12.972 4 24c0 3.186.77 6.343 2.232 9.172l-2.139 7.657a2.503 2.503 0 00.64 2.439 2.504 2.504 0 002.441.64l7.661-2.139A20.005 20.005 0 0024 44c11.028 0 20-8.972 20-20S35.028 4 24 4z" />
    ) : (
      <Path d="M24 4C12.972 4 4 12.972 4 24c0 3.275.863 6.335 2.262 9.064l-2.168 7.764c-.505 1.804 1.278 3.585 3.082 3.08l7.767-2.168C17.671 43.137 20.727 44 24 44c11.028 0 20-8.972 20-20S35.028 4 24 4zm0 3c9.406 0 17 7.594 17 17 0 9.406-7.594 17-17 17-3.003 0-5.808-.782-8.256-2.146a1.5 1.5 0 00-1.135-.135L7.223 40.78l2.062-7.383a1.5 1.5 0 00-.135-1.134A16.89 16.89 0 017 24c0-9.406 7.594-17 17-17z" />
    )}
    {number > 0 && (
      <>
        <Circle
          cx={active ? 37 : 37}
          cy={active ? 12 : 10}
          r={active ? 14 : 11}
          fill="#1DA4FE"
        />
        <Text
          x={number > 9 ? (active ? 27 : 29) : active ? 32 : 33}
          y={active ? 18 : 15}
          fill="#FFF"
          fontSize={active ? '18px' : '14px'}
        >
          {number}
        </Text>
      </>
    )}
  </Svg>
);

export default Chat;
