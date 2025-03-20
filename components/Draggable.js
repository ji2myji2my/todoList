import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';

import { getPosition, getOrder, ITEM_HEIGHT } from "./utils/utils";

const Draggable = ({ children, positions, id, numberOfItems }) => {
  // const translateX = useSharedValue(0);
  // const translateY = useSharedValue(0);
  // const startX = useSharedValue(0);
  // const startY = useSharedValue(0);

  // const isGestureActive = useSharedValue(false);
  // const currentIndex = positions.value[id];
  // const translateY = useSharedValue(getPosition(currentIndex).y);
  const isGestureActive = useSharedValue(false);
  
  const offsetY = useSharedValue(0);


  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isGestureActive.value = true;
      ctx.startIndex = positions.value[id];
      ctx.startY = offsetY.value; // en général 0
    },
    onActive: (event, ctx) => {
      // Le déplacement du doigt
      offsetY.value = ctx.startY + event.translationY;

      // On calcule la position de base (ctx.startIndex * ITEM_HEIGHT)
      // + l'offset du geste
      const baseY = ctx.startIndex * ITEM_HEIGHT + offsetY.value;

      // Déduire l'index visé (nouvelle position dans la liste)
      const newIndex = getOrder(baseY, ITEM_HEIGHT, numberOfItems);
      const oldIndex = positions.value[id];

      // Si ça change, on fait un swap dans positions.value
      if (newIndex !== oldIndex) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newIndex
        );
        if (idToSwap) {
          // On échange
          const temp = positions.value[id];
          positions.value[id] = positions.value[idToSwap];
          positions.value[idToSwap] = temp;
        }
      }
    },
    onFinish: () => {
      // Fin du drag : on ramène offsetY à 0
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
        zIndex: 1000,
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

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;

// https://www.youtube.com/watch?v=219Rv7qUEZw video time stamp 10:15
