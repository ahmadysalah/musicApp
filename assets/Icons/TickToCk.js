import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

const TickTock = () => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path fill="url(#pattern0)" d="M0 0H22V22H0z" />
    <Defs>
      <Pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0" transform="translate(0 -.017) scale(.00202)" />
      </Pattern>
      <Image
        id="image0"
        width={495}
        height={512}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);

export default TickTock;