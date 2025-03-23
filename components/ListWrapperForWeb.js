import React from 'react';
import { View, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
          {taskItems.map((task) => (
            <SortableItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))}
        </View>
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
    // Sur web, un conteneur
    width: '90%',
    height: '70%',
    backgroundColor: '#2e4054',
    marginHorizontal: 'auto',
    padding: 10,
    top: 40,
    borderRadius: 10,
  },
  itemContainer: {
    marginBottom: 8,
  },
});
