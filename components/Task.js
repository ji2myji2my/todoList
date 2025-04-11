import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <View style={styles.item}>

      <View style={styles.itemLeft}>

        <TouchableOpacity onPress={() => onToggle(id)}>
          <View style={styles.circular} />
        </TouchableOpacity>
        
        <Text
          numberOfLines={1}
          ellipsizeMode="tail" 
          style={[styles.itemText, completed && styles.itemTextCompleted]}>
          {text}
        </Text>

      </View>
      
      <TouchableOpacity
        style={styles.square}
        onPress={() => onDelete(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: "100%",
    // backgroundColor: "#fff",
    padding: 20,
    // borderRadius: 10,
    borderBottomColor: "#808080",
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 20,
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
    color: "	#808080",
    maxWidth: 500,
    fontSize: 20,
    // fontWeight: "bold",
    padding: 10,
    flexShrink: 1,
  },
  // Style qu'on applique conditionnellement quand la tâche est complétée
  itemTextCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.3,
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
