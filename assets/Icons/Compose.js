import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Compose = ({ color }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill={color}>
    <Path d="M23 22H10a1 1 0 010-2h13a1 1 0 010 2zM20.268 4.146l-1.414-1.414c-.756-.756-2.073-.755-2.828 0L13.958 4.8 18.2 9.042l2.068-2.068c.378-.377.586-.879.586-1.414 0-.534-.208-1.036-.586-1.414zM12.543 6.215L2.237 16.521a.49.49 0 00-.133.239l-1.09 4.625a.5.5 0 00.601.602l4.625-1.09a.499.499 0 00.239-.133l10.306-10.306z" />
  </Svg>
);

export default Compose;
