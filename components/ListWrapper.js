import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";

import Task from './Task'



const ListWrapper = ({ taskItems, setTaskItems }) => {

    const [completed, setCompleted] = useState(false);
    
    const completTask = (index) => {
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.item}>
                      {
                          taskItems.map((item, index) => {
                              return (
                                  <TouchableOpacity  key= {index} onPress={() => completTask(index)}>
                              <Task text={item} completed={completed} setCompleted={setCompleted}/>
                            </TouchableOpacity>
                          ) 

                        })
                    }
                    </View>
                </ScrollView>
            </View>
      </View>
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