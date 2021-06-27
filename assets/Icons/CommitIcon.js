import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CommitIcon = () => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    style={{ marginLeft: '20%', marginRight: 7 }}
  >
    <Path
      d="M21 10.444a9.311 9.311 0 01-1 4.223 9.445 9.445 0 01-8.444 5.222 9.311 9.311 0 01-4.223-1L1 21l2.111-6.333a9.311 9.311 0 01-1-4.223A9.444 9.444 0 017.333 2a9.311 9.311 0 014.223-1h.555A9.422 9.422 0 0121 9.889v.556z"
      stroke="#A5A5A5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CommitIcon;
