// DraggableForMobile.js
import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ITEM_HEIGHT, getOrder } from './utils/utils';
import { Platform } from 'react-native';

const DraggableForMobile = ({ children, positions, id, numberOfItems }) => {
  const isGestureActive = useSharedValue(false);
  const offsetY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isGestureActive.value = true;
      ctx.startIndex = positions.value[id];
      ctx.startY = offsetY.value;
    },
    onActive: (evt, ctx) => {
      offsetY.value = ctx.startY + evt.translationY;
      const baseY = ctx.startIndex * ITEM_HEIGHT + offsetY.value;
      const newIndex = getOrder(baseY, ITEM_HEIGHT, numberOfItems);
      const oldIndex = positions.value[id];

      if (newIndex !== oldIndex) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newIndex
        );
        if (idToSwap) {
          const temp = positions.value[id];
          positions.value[id] = positions.value[idToSwap];
          positions.value[idToSwap] = temp;
        }
      }
    },
    onFinish: () => {
      offsetY.value = withTiming(0);
      isGestureActive.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const officialIndex = positions.value[id];
    const baseY = officialIndex * ITEM_HEIGHT;

    if (isGestureActive.value) {
      return {
        position: 'absolute',
        width: '100%',
        transform: [{ translateY: baseY + offsetY.value }],
        zIndex: 999,
      };
    } else {
      return {
        position: 'absolute',
        width: '100%',
        transform: [{ translateY: withTiming(baseY) }],
        zIndex: 1,
      };
    }
  });

  // On enveloppe tout dans PanGestureHandler
  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default DraggableForMobile;

// https://www.youtube.com/watch?v=219Rv7qUEZw video time stamp 10:15