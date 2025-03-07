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

        <View style={styles.viewTitle}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <TouchableOpacity style={styles.modeHandlebtn} >*</TouchableOpacity>
        </View>

        {/* Write a tasks */}
        <WriteTask taskItems={taskItems} setTaskItems={setTaskItems} />


        <View style={styles.tasksWrapper}>

          {/* <ImageBackground source={background} resizeMode="cover" style={styles.image}> */}
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



    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  viewTitle: {
    display: 'flex',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }, 
  sectionTitle: {

  },   
  modeHandlebtn: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  text: {},

  tasksWrapper: {
    backgroundColor : "#2e4054",
    width: '90%',
    marginInline: 'auto',
    marginTop: 20,
    borderRadius: 5,
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
