import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";

//Images import 
import CrossIcon from "../assets/images/icon-cross.svg";
import CheckIcon from "../assets/images/icon-check.svg";

const Task = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <View style={styles.item}>

      <View style={styles.itemLeft}>

        <TouchableOpacity onPress={() => onToggle(id)}>
          <View style={[styles.circular, completed && styles.circularCompleted]}>
            {completed && <CheckIcon width={34} height={34} fill="#fff" />}
          </View>
        </TouchableOpacity>
        
        <Text
          numberOfLines={1}
          ellipsizeMode="tail" 
          style={[styles.itemText, completed && styles.itemTextCompleted]}>
          {text}
        </Text>

      </View>
      
      <TouchableOpacity style={styles.crossBtn} onPress={() => onDelete(id)}>
        <CrossIcon width={34} height={34} fill="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: "100%",
    padding: 20,
    borderBottomColor: "#808080",
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    padding: 10,
    flexShrink: 1,
  },
  // Style qu'on applique conditionnellement quand la tâche est complétée
  itemTextCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.3,
  },

  circular: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgb(148, 15, 182)",
    marginRight: 15,
  },

  // Style qu'on applique conditionnellement quand la tâche est complétée
  circularCompleted: {
    backgroundColor: "rgb(148, 15, 182)",
    borderColor: "rgb(148, 15, 182)",
  },

  crossBtn: { 
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
  },
  
  CrossIcon: {
    width: 34,
    height: 34,

  },
});

export default Task;
