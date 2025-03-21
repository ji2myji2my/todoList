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


// Custom COmponent
import WriteTask from './components/WriteTask'
import ListWrapper from './components/ListWrapper'
import LightDarkBar from './components/LightDarkBar'


export default function App() {

  // const theme = {mode: "dark"};
  // let activeColors = colors[theme.mode];

  const [taskItems, setTaskItems] = useState([]);

  // Si on est sur web => Wrap DndProvider
  if (Platform.OS === 'web') {
    return (
      <DndProvider backend={HTML5Backend}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#E8EAED' }}>
            <LightDarkBar />
            <WriteTask taskItems={taskItems} setTaskItems={setTaskItems} />
            <ListWrapper taskItems={taskItems} setTaskItems={setTaskItems} />
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
        <WriteTask taskItems={taskItems} setTaskItems={setTaskItems} />
        <ListWrapper taskItems={taskItems} setTaskItems={setTaskItems} />
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
