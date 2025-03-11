import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// custom component
import Task from './Task'
import Draggable from './Draggable'



const ListWrapper = ({ taskItems, setTaskItems }) => {

    const [completed, setCompleted] = useState(false);
    
    return (
        <GestureHandlerRootView style={styles.container}>
          <View style={styles.box}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                  <View style={styles.item}>
                    {
                      taskItems.map((item, index) => {
                        return (
                          <Draggable key={item}>
                            {/* <TouchableOpacity  key= {index} onPress={() => completTask(index)}> */}
                            <TouchableOpacity  key= {index}>
                              <Task 
                                text={item} 
                                completed={completed} 
                                setCompleted={setCompleted}
                                taskItems={taskItems}
                                setTaskItems={setTaskItems}
                                index={index}
                              />
                            </TouchableOpacity>
                          </Draggable>
                        ) 
                        
                      })
                    }
                  </View>
              </ScrollView>
          </View>
        </GestureHandlerRootView>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      },

      box: {
        width: "90%",
        height: "75%",
        backgroundColor: "#2e4054",
        borderRadius: 8,
        padding: 16,
      },

      item: {
        // marginTop: 10,
      },

      scrollContent: {
        flexGrow: 1,
      },

      item: {
        color: "#fff",
        marginVertical: 8,
      },

});

export default ListWrapper;