import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';

const WriteTask = ({ onAddTask }) => {

  const [text, setText] = useState('');
  const handlePress = () => {
    if (text.trim() === '') return;
    // On informe le parent qu’on a une nouvelle tâche
    onAddTask(text.trim());
    // On réinitialise l’input
    setText('');
    Keyboard.dismiss();
  };
  
  
  // const [task, setTask] = useState("");
    // const handleAddTask = () => {
    //   Keyboard.dismiss();
    //   setTaskItems([...taskItems,task]);
    //   setTask("");
    // }

    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height" }
          style={styles.keyboardAvoidingView}
        >

          <TextInput style={styles.input} 
            placeholder={'Create a new todo...'} 
            value={text} 
            onChangeText={text => setText(text)}
          />

          <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({

    keyboardAvoidingView: {
        backgroundColor : "#2e4054",
        marginInline: 'auto',
        position: 'relative',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
        borderRadius: 5,
      },

      input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 60,
        backgroundColor: '#FFF',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    
      },

      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },

      addText: { },

});

export default WriteTask;