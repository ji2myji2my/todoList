import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  // État local pour savoir si la tâche est complétée ou non
  const [completed, setCompleted] = useState(false);

  // Bascule la valeur completed
  const handleToggleComplete = () => {
    setCompleted(!completed);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...props.taskItems];
    itemsCopy.splice(index, 1);
    props.setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.item}>

      <View style={styles.itemLeft}>

        <TouchableOpacity onPress={handleToggleComplete}>
          <View style={styles.circular} />
        </TouchableOpacity>
        
        <Text style={[styles.itemText, completed && styles.itemTextCompleted]}>
          {props.text}
        </Text>

      </View>
      
      <TouchableOpacity
        style={styles.square} key={props.index} 
        onPress={() => deleteTask(props.index)}
      />
      
      {/* <View style={styles.square} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 80,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    zIndex: 2,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "blue",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  // Style qu'on applique conditionnellement quand la tâche est complétée
  itemTextCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6, // Optionnel, pour un effet visuel plus marqué
  },

  circular: {
    width: 24,
    height: 24,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 12,
    marginEnd: 10,
  },
});

export default Task;
