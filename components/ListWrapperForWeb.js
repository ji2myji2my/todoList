import React from 'react';
import { View, StyleSheet } from 'react-native';
// DndKit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Task from './Task';

export default function ListWrapperForWeb({ taskItems, setTaskItems }) {
  const sensors = useSensors(useSensor(PointerSensor, { distance: 5 }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = taskItems.findIndex((t) => t === active.id);
      const newIndex = taskItems.findIndex((t) => t === over.id);
      const newArr = arrayMove(taskItems, oldIndex, newIndex);
      setTaskItems(newArr);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={taskItems} strategy={verticalListSortingStrategy}>
        <View style={styles.container}>
          {taskItems.map((item, index) => (
            <SortableItem
              key={item}
              id={item}
              index={index}
              text={item}
              taskItems={taskItems}
              setTaskItems={setTaskItems}
            />
          ))}
        </View>
      </SortableContext>
    </DndContext>
  );
}

// "Un" item sortable
function SortableItem({ id, index, text, taskItems, setTaskItems }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const animatedStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <View ref={setNodeRef} style={[styles.item, animatedStyle]} {...attributes} {...listeners}>
      <Task 
        text={text}
        index={index}
        taskItems={taskItems}
        setTaskItems={setTaskItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '75%',
    backgroundColor: '#2e4054',
    marginHorizontal: 'auto',
  },
  item: {
    marginBottom: 8,
  },
});
