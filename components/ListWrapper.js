import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

// custom component
import Task from './Task'
import Draggable from './Draggable'



const ListWrapper = ({ taskItems, setTaskItems }) => {

    // const [completed, setCompleted] = useState(false);

    const positions = useSharedValue({});

    useEffect(() => {
      const newPositions = {};
      taskItems.forEach((_, index) => {
        // Si l'item existait déjà dans positions.value, on conserve sa position ;
        // sinon, on initialise à l'index actuel.
        if (positions.value[index] !== undefined) {
          newPositions[index] = positions.value[index];
        } else {
          newPositions[index] = index;
        }
      });
      positions.value = newPositions;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskItems]);

    const totalHeight = taskItems.length * ITEM_HEIGHT;
    
    return (
        <GestureHandlerRootView style={styles.container}>
          <View style={styles.box}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={{ height: totalHeight }}
            >
                  <View style={styles.innerContainer}>
                    {
                      taskItems.map((item, index) => {
                        return (
                          <Draggable
                            key={index}
                            id={index}
                            positions={positions}
                            numberOfItems={taskItems.length}
                          >
                            {/* <TouchableOpacity  key= {index} onPress={() => completTask(index)}> */}
                            <TouchableOpacity  key= {index}>
                              <Task 
                                text={item} 
                                // completed={completed} 
                                // setCompleted={setCompleted}
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

      innerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },

      scrollContainer: {
        flex: 1,
      },

      item: {
        position: 'relative',
        color: "#fff",
        marginVertical: 8,
      },

});

export default ListWrapper;