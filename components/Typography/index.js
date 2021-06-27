import React from 'react';
import Svg, {
  LinearGradient,
  Defs,
  Stop,
  Text as GradientText,
  TSpan,
} from 'react-native-svg';
import { Text } from 'react-native';
import { COLORS, DEVICE } from '../../utils/constants';
import styles from './style';

// types [ h1 - h6, small ]
const Typography = ({
  type,
  style,
  color,
  onPress,
  children,
  bold,
  align,
  gradient,
  width,
  x,
  height,
  numberOfLines,
}) =>
  !gradient ? (
    <Text
      style={[
        styles[type || 'h3'],
        { color: COLORS[color || 'primary'] },
        bold && { fontWeight: 'bold' },
        align && { textAlign: align },
        style,
      ]}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  ) : (
    <Svg
      width={width || DEVICE.widthP(18)}
      height={height || 20}
      viewBox="4 0 40 20"
    >
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={-1}
          y1={-4}
          x2={57.5994}
          y2={8.09647}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.208333} stopColor="#76BDFF" />
          <Stop offset={0.526042} stopColor="#FF66FE" />
          <Stop offset={0.911458} stopColor="#FFC4AB" />
        </LinearGradient>
      </Defs>
      <GradientText
        style={[style]}
        onPress={onPress}
        fill={!bold ? 'url(#paint0_linear)' : COLORS.secondary}
      >
        <TSpan x={x || 0} y={DEVICE.heightP(2.4)}>
          {children}
        </TSpan>
      </GradientText>
    </Svg>
  );

export default Typography;
