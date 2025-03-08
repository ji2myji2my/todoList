import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  // État local pour savoir si la tâche est complétée ou non
  // const [completed, setCompleted] = useState(false);

  // Bascule la valeur completed
  const handleToggleComplete = () => {
    props.setCompleted(!props.completed);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square} />
        {/* On applique le style de texte barré si completed = true */}
        <Text style={[styles.itemText, props.completed && styles.itemTextCompleted]}>
          {props.text}
        </Text>
      </View>
      
      {/* Rendre le bouton "circular" cliquable */}
      <TouchableOpacity onPress={handleToggleComplete}>
        <View style={styles.circular} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
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
  },
});

export default Task;
