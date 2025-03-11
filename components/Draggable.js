import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle
} from 'react-native-reanimated';
import { View } from 'react-native';

const Draggable = ({ children }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const isGestureActive = useSharedValue(false);


  const panGesture = useAnimatedGestureHandler({
    onBegin: () => {
      // Store the initial positions in ctx
      startX.value = translateX.value;
      startY.value = translateY.value;
      console.log("onClick");
      console.log("ctx.startX", startX.value);
      console.log("ctx.startY", startY.value);
    },
    onActive: (evt) => {
      // Use ctx.startX and ctx.startY here
      translateX.value = startX.value + evt.translationX;
      translateY.value = startY.value + evt.translationY;
      console.log("translationX:", evt.translationX, "translationY:", evt.translationY);
      console.log("ctx.startX", startX.value);
      console.log("ctx.startY", startY.value);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    return {
      zIndex,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;

// https://www.youtube.com/watch?v=219Rv7qUEZw video time stamp 7:12
