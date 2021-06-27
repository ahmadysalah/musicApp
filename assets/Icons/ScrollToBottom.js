import * as React from 'react';
import Svg, { G, Circle, Path, Defs } from 'react-native-svg';
import { DEVICE } from '../../utils/constants';

const HartIcon = () => (
  <Svg
    width={DEVICE.height * 0.03}
    height={DEVICE.height * 0.03}
    viewBox="0 0 612.004 612.004"
  >
    <G filter="url(#filter0_d)">
      <Circle cx={61} cy={57} r={55} fill="#fff" />
      <Circle
        cx={61}
        cy={57}
        r={56}
        stroke="#000"
        strokeOpacity={0.1}
        strokeWidth={2}
      />
      <Path
        fill="#1DA4FE"
        d="M499.147 160.094L330.222 329.019c-6.472 6.472-15.075 10.035-24.223 10.035-9.146 0-17.749-3.561-24.218-10.035L112.854 160.094c-25.822-25.817-67.674-25.817-93.491 0-25.817 25.819-25.817 67.674 0 93.491L188.29 422.508c31.443 31.445 73.245 48.764 117.712 48.764s86.269-17.319 117.714-48.761l168.925-168.925c25.817-25.817 25.817-67.674 0-93.491-25.819-25.818-67.679-25.818-93.494-.001z"
      />
    </G>
    <Defs />
  </Svg>
);

export default HartIcon;
