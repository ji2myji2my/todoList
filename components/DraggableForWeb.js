/**
 * DraggableForWeb.js
 * (Adapté pour stocker { id, text, ... } et rendre un <Task />)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

// DnD-Kit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Ton composant local
import Task from './Task';

/** 
 * DraggableForWeb reçoit :
 *  - tasks : un tableau d'objets { id, text, ... }
 *  - setTasks : pour mettre à jour la liste
 */
export default function DraggableForWeb({ tasks, setTasks }) {
  // Sensors pour @dnd-kit (pointer = souris)
  const sensors = useSensors(useSensor(PointerSensor, { distance: 5 }));

  // Quand on finit le drag
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      // Trouver l'index de la tâche source, et de la tâche cible
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);

      // Réordonner via arrayMove
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);
    }
  };

  // On donne à SortableContext la liste des IDs
  const taskIds = tasks.map((t) => t.id);

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <View style={styles.container}>
          {tasks.map((taskObj, index) => (
            <SortableItem 
              key={taskObj.id} 
              id={taskObj.id}
              taskObj={taskObj}
              index={index}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </View>
      </SortableContext>
    </DndContext>
  );
}

/**
 * SortableItem
 * Chaque "ligne" dans la liste
 * On y rend un <Task /> par ex, 
 * ou tout autre composant qui représente la tâche.
 */
function SortableItem({ id, taskObj, index, tasks, setTasks }) {
  // useSortable => rend un item déplaçable
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
    <View 
      ref={setNodeRef} 
      style={[styles.itemContainer, animatedStyle]}
      {...attributes}
      {...listeners}
    >
      {/* On rend le composant Task, qui attend "text" et autres props */}
      <Task 
        text={taskObj.text} 
        index={index}
        taskItems={tasks}
        setTaskItems={setTasks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Sur web, on peut faire un flex column
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
});
