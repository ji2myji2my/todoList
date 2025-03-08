import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';


// Custom COmponent
import WriteTask from './components/WriteTask'
import ListWrapper from './components/ListWrapper'
import LightDarkBar from './components/LightDarkBar'


export default function App() {

  // const theme = {mode: "dark"};
  // let activeColors = colors[theme.mode];

  const [taskItems, setTaskItems] = useState([]);

  return (
    <View style={styles.container}>
   
        <LightDarkBar />

        <WriteTask taskItems={taskItems} setTaskItems={setTaskItems} />

        <ListWrapper taskItems={taskItems} setTaskItems={setTaskItems}/>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

});
