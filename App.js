import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, StyleSheet, 
  Text, TextInput, 
  TouchableOpacity, 
  View, 
  ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {v4 as uuidv4} from 'uuid';


// Custom COmponent
import WriteTask from './components/WriteTask'
import ListWrapperForWeb from './components/ListWrapperForWeb';
import ListWrapperForMobile from './components/ListWrapperForMobile';
import LightDarkBar from './components/LightDarkBar'


export default function App() {
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = (taskText) => {
    // Créer une tâche avec un ID unique, 
    // le texte saisi, et completed = false
    const newTask = {
      id: uuidv4(),
      text: taskText, 
      completed: false
    };
    // Mettre à jour la liste
    setTaskItems((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id) => {
    setTaskItems((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTaskItems((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  // Si on est sur web => Wrap DndProvider
  if (Platform.OS === 'web') {
    return (
      <DndProvider backend={HTML5Backend}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#E8EAED' }}>
            <LightDarkBar />
            <WriteTask  onAddTask={handleAddTask} />
            <ListWrapperForWeb
              taskItems={taskItems}
              setTaskItems={setTaskItems}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          </View>
        </GestureHandlerRootView>
      </DndProvider>
    );
  }

  // Sinon (iOS/Android) => pas besoin de DndProvider
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#E8EAED' }}>
        <LightDarkBar />
        <WriteTask  onAddTask={handleAddTask} />
        <ListWrapperForMobile
          taskItems={taskItems}
          setTaskItems={setTaskItems}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </View>
    </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

});
