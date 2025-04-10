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


// Custom Component
import WriteTask from './components/WriteTask'
import ListWrapperForWeb from './components/ListWrapperForWeb';
import ListWrapperForMobile from './components/ListWrapperForMobile';
import LightDarkBar from './components/LightDarkBar'
import DisplayNavBar from './components/DisplayNavBar';


export default function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [taskItemsCpy, setTaskItemsCpy] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  
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
    setTaskItemsCpy((prevTasks) => [...prevTasks, newTask]);
    setNumberOfTasks((prevCount) => prevCount + 1);
  };
    
  const upDateTaskItems = (key) => {
    if (key === 'all') {
      return (setTaskItems(taskItemsCpy));
    }
    if (key === 'active') {
      return (setTaskItems(taskItemsCpy.filter((task) => !task.completed)));
    }
    if (key === 'completed') {
      return  (setTaskItems(taskItemsCpy.filter((task) => task.completed)));
    }
  };

  const toggleTask = (id) => {
    setTaskItems((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setTaskItemsCpy((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTaskItems((prevTasks) => prevTasks.filter((t) => t.id !== id));
    setTaskItemsCpy((prevTasks) => prevTasks.filter((t) => t.id !== id));
    setNumberOfTasks((prevCount) => prevCount - 1);
  };

  const clearCompletedTasks = () => {
    setTaskItems((prevTasks) => prevTasks.filter((task) => !task.completed));
    setTaskItemsCpy((prevTasks) => prevTasks.filter((task) => !task.completed));
    setNumberOfTasks((prevCount) => prevCount - taskItems.filter((task) => task.completed).length); 
  }

  // Si on est sur web => Wrap DndProvider
  if (Platform.OS === 'web') {
    return (
      <DndProvider backend={HTML5Backend}>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <LightDarkBar />
            <View style={styles.container}>
            <WriteTask  onAddTask={handleAddTask} style={styles.WriteTaskStyle}/>
            <ListWrapperForWeb style={styles.ListWrapperForWebStyle}
              taskItems={taskItems}
              setTaskItems={setTaskItems}
              setTaskItemsCpy={setTaskItemsCpy}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
            <DisplayNavBar style={styles.DisplayNavBarStyle} 
              upDateTaskItems={upDateTaskItems}
              clearCompletedTasks={clearCompletedTasks}
              numberOfTasks={numberOfTasks}
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
    // backgroundColor: '#E8EAED',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginHorizontal: 'auto',
    marginTop: 20,
    width: '60vw',
    // height: '80vh',
    marginBottom: 60,
  },
  // WriteTaskStyle: {
  //   height: '10vh',
  //   width: '90%',
  // },
  // ListWrapperForWebStyle : { 
  //   height: '80vh',
  //   width: '100%',
  // },
  // DisplayNavBarStyle : {
  //   // height: '8vh',
  // },
});
