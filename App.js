import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
// import Task from './components/Task'
import background from './images/bg-desktop-light.jpg';
import { colors } from './config/theme';

import Task from './components/Task'
import WriteTask from './components/WriteTask'
import Wrapper from './components/Wrapper'


export default function App() {

  const theme = {mode: "dark"};
  let activeColors = colors[theme.mode];

  const [taskItems, setTaskItems] = useState([]);

  return (
    <View style={styles.container}>
        {/* Today's Tasks*/}

        <View style={styles.viewTitle}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <TouchableOpacity style={styles.modeHandlebtn} >*</TouchableOpacity>
        </View>

        <WriteTask taskItems={taskItems} setTaskItems={setTaskItems} />

        <Wrapper taskItems={taskItems} setTaskItems={setTaskItems}/>

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

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

});
