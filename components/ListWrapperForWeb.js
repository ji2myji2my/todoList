import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
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

/**
 * ListWrapperForWeb
 *
 * Reçoit :
 *  - taskItems : [{ id, text, completed }, ...]
 *  - setTaskItems : pour mettre à jour la liste
 *  - toggleTask(id)
 *  - deleteTask(id)
 *
 * On affiche la liste dans un SortableContext -> un <SortableItem> par élément.
 * handleDragEnd => arrayMove(...) pour réordonner.
 */
export default function ListWrapperForWeb({
  taskItems,
  setTaskItems,
  setTaskItemsCpy,
  toggleTask,
  deleteTask,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      // reorder
      const oldIndex = taskItems.findIndex((t) => t.id === active.id);
      const newIndex = taskItems.findIndex((t) => t.id === over.id);
      const newArr = arrayMove(taskItems, oldIndex, newIndex);
      setTaskItems(newArr);
      setTaskItemsCpy(newArr);
    }
  };

  // Les "items" du SortableContext doivent être un tableau des IDs
  const itemIds = taskItems.map((task) => task.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView style={styles.scrollView}>
              {taskItems.map((task) => (
                <SortableItem
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
      </SortableContext>
    </DndContext>
  );
}

/**
 * SortableItem
 *
 * Reçoit un "task" = { id, text, completed }
 * -> useSortable({ id: task.id })
 * -> Rend un <Task ... />
 */
function SortableItem({ task, toggleTask, deleteTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const styleRn = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <View
      ref={setNodeRef}
      style={[styles.itemContainer, styleRn]}
      {...attributes}
      {...listeners}
    >
      <Task
        id={task.id}
        text={task.text}
        completed={task.completed}
        onToggle={() => toggleTask(task.id)}
        onDelete={() => deleteTask(task.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // // Sur web, un conteneur
    width: '100%',
    height: '100%',
    backgroundColor: '#2e4054',
    // marginHorizontal: 'auto',
    padding: 10,
    top: 30,
    borderRadius: 10,
    paddingBottom: 60,
  },
  itemContainer: {
    marginBottom: 8,
  },
});
