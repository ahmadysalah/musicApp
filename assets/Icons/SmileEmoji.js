import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SmileEmoji = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    style={{ marginHorizontal: 5 }}
  >
    <Path
      d="M13.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      fill="#1DA4FE"
    />
    <Path
      d="M9.99 0C4.47 0 0 4.48 0 10s4.47 10 9.99 10C15.52 20 20 15.52 20 10S15.52 0 9.99 0zM10 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2-1.48 0-2.75-.81-3.45-2H4.88c.8 2.05 2.79 3.5 5.12 3.5z"
      fill="#1DA4FE"
    />
  </Svg>
);

export default SmileEmoji;
