import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';

// import Task from './components/Task'




const WriteTask = ({ taskItems, setTaskItems }) => {

    const [task, setTask] = useState("");

    const handleAddTask = () => {
      Keyboard.dismiss();
      setTaskItems([...taskItems,task]);
      setTask("");
    }

    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height" }
          style={styles.writeTaskWrapper}
        >

          <TextInput style={styles.input} placeholder={'Currently Typing'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({

    writeTaskWrapper: {
        backgroundColor : "#2e4054",
        marginInline: 'auto',
        position: 'relative',
        top: 10,
        width: '90%',
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