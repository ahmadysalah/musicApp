import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { Modalize } from 'react-native-modalize';

const HEADER_HEIGHT = 100;

const AppleMusicPlayer = () => {
  const animated = useRef(new Animated.Value(0)).current;
  const combinedRef = useRef();
  const [handle, setHandle] = useState(false);

  const handlePosition = (position) => {
    setHandle(position === 'top');
  };

  useEffect(() => {
    combinedRef.current.open();
  }, []);

  const renderContent = () => (
    <>
      <Animated.View
        style={[
          s.content__cover,
          {
            transform: [
              {
                scale: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.18, 1],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: animated.interpolate({
                  inputRange: [0, 0.25, 1],
                  outputRange: [0, 100, 140],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: animated.interpolate({
                  inputRange: [0, 0.25, 1],
                  outputRange: [0, 100, 165],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Image
          style={[s.content__asset]}
          source={{
            uri:
              'https://images.genius.com/7ea34ad2fa694fb706de3e81dc1588c4.1000x1000x1.jpg',
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          s.content__header,
          {
            opacity: animated.interpolate({
              inputRange: [0, 0.75],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <Text style={s.content__title}>Your Design</Text>
      </Animated.View>
    </>
  );

  return (
    <Modalize
      ref={combinedRef}
      panGestureAnimatedValue={animated}
      snapPoint={HEADER_HEIGHT}
      closeSnapPointStraightEnabled={false}
      withHandle={handle}
      handlePosition="inside"
      handleStyle={{
        top: 13,
        width: 40,
        height: handle ? 6 : 0,
        backgroundColor: '#bcc0c1',
      }}
      onPositionChange={handlePosition}
      withOverlay={false}
      alwaysOpen={100}
    >
      {renderContent()}
    </Modalize>
  );
};

const s = StyleSheet.create({
  content__header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: HEADER_HEIGHT,

    paddingHorizontal: 30,
    paddingBottom: 5,
  },

  content__cover: {
    zIndex: 100,

    marginTop: -132, // not the best
    marginLeft: -115, // not the best

    width: 360,
    height: 360,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },

  content__asset: {
    width: '100%',
    height: '100%',
  },

  content__title: {
    paddingLeft: 90,
    marginRight: 'auto',

    fontSize: 18,
  },

  content__inner: {
    top: 200,
    left: 30,
  },
});

export default AppleMusicPlayer;
