import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Handle = () => (
  <Svg width={16} height={16} viewBox="0 0 20 12" fill="none">
    <Path
      d="M19 6H1M19 1H1M19 11H1"
      stroke="#A5A5A5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Handle;
