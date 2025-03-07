import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
// import Task from './components/Task'
import background from './images/bg-desktop-light.jpg';
import { colors } from './config/theme';

import Task from './components/Task'
import WriteTask from './components/WriteTask'


export default function App() {

  const theme = {mode: "dark"};
  let activeColors = colors[theme.mode];

  const [taskItems, setTaskItems] = useState([]);

  const completTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
        {/* Today's Tasks*/}
        <View style={styles.tasksWrapper}>
          
          {/* <ImageBackground source={background} resizeMode="cover" style={styles.image}> */}
            <Text style={styles.sectionTitle}>Today's tasks</Text>
          {/* </ImageBackground> */}

          {/* <Text style={styles.sectionTitle}>Today's tasks</Text> */}


          <View style={styles.item}>
            {/* This is where the tasks will go */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity  key= {index} onPress={() => completTask(index)}>
                    <Task text={item}/>
                  </TouchableOpacity>
                ) 
                
              })
            }
          </View>
        
        </View>

        {/* Write a tasks */}
        <WriteTask taskItems={taskItems} setTaskItems={setTaskItems} />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  text: {},
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 30,
    
  },
});
