import React, { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import Task from './Task';
import DraggableForMobile from './DraggableForMobile';
import { ITEM_HEIGHT } from './utils/utils';

export default function ListWrapperForMobile({ taskItems, setTaskItems }) {
  const positions = useSharedValue({});

  useEffect(() => {
    const newPositions = {};
    taskItems.forEach((_, index) => {
      if (positions.value[index] !== undefined) {
        newPositions[index] = positions.value[index];
      } else {
        newPositions[index] = index;
      }
    });
    positions.value = newPositions;
  }, [taskItems]);

  const totalHeight = taskItems.length * ITEM_HEIGHT;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ width: '90%', height: '75%', backgroundColor: '#2e4054' }}>
        {/* On itère sur chaque élément -> 1 DraggableForMobile par item */}
        {taskItems.map((item, index) => (
          <DraggableForMobile
            key={index}
            id={index}
            positions={positions}
            numberOfItems={taskItems.length}
          >
            <Task
              text={item}
              taskItems={taskItems}
              setTaskItems={setTaskItems}
              index={index}
            />
          </DraggableForMobile>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
