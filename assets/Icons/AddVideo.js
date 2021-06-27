import * as React from 'react';
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const AddVideo = ({ style }) => (
  <Svg width={47} height={48} viewBox="0 0 47 48" fill="none" style={style}>
    <G filter="url(#filter0_d)">
      <Rect
        x={4.42374}
        y={3.91528}
        width={38.2034}
        height={38.2034}
        rx={10}
        fill="url(#paint0_linear)"
      />
      <Path
        d="M26.152 19.947H13.975v2.047h12.177v-2.047zm0-4.093H13.975V17.9h12.177v-2.046zm4.059 8.186v-4.093h-2.03v4.093h-4.059v2.047h4.06v4.093h2.029v-4.093h4.06V24.04h-4.06zm-16.236 2.047h8.118V24.04h-8.118v2.047z"
        fill="#fff"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={42.6271}
        y1={3.91528}
        x2={-0.482353}
        y2={10.6325}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5ABEFC" />
        <Stop offset={1} stopColor="#009DFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AddVideo;
