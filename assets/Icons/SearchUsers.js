import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const { widthP } = DEVICE;
const SearchUsers = ({ active }) => (
  <Svg
    width={active ? widthP(9) : widthP(7.7)}
    height={active ? widthP(16.6) : widthP(15.3)}
    viewBox="0 0 29 26"
  >
    <Path
      d="M11.824 11.823a5.912 5.912 0 100-11.823 5.912 5.912 0 000 11.823zM12.34 14.794C8.307 14.646 0 16.656 0 20.691v1.478c0 .813.665 1.478 1.478 1.478H14.1c-3.65-4.08-1.818-8.705-1.76-8.853zm13.42 5.927c.695-1.183 1.035-2.616.71-4.168-.502-2.424-2.542-4.36-4.995-4.67-3.888-.503-7.169 2.763-6.651 6.65.325 2.454 2.246 4.493 4.67 4.996 1.552.325 2.986-.015 4.168-.71l2.749 2.75a1.474 1.474 0 002.084-2.084L25.76 20.72zm-5.069-.03a2.965 2.965 0 01-2.956-2.956 2.965 2.965 0 012.956-2.956 2.965 2.965 0 012.956 2.956 2.965 2.965 0 01-2.956 2.956z"
      fill={active ? '#1DA4FE' : '#A5A5A5'}
    />
  </Svg>
);

export default SearchUsers;
