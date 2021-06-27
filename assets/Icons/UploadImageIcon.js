import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const UploadImageIcon = () => (
  <Svg
    width={18}
    height={20}
    viewBox="0 0 18 20"
    fill="none"
    style={{ marginHorizontal: 10 }}
  >
    <Path
      d="M18 17.778V2.222C18 1 17.1 0 16 0H2C.9 0 0 1 0 2.222v15.556C0 19 .9 20 2 20h14c1.1 0 2-1 2-2.222zM5.5 11.667L8 15.01 11.5 10l4.5 6.667H2l3.5-5z"
      fill="#1DA4FE"
    />
  </Svg>
);

export default UploadImageIcon;
