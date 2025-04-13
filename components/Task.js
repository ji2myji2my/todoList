import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CrossIcon from "../assets/images/icon-cross.svg";
import CheckIcon from "../assets/images/icon-check.svg";
// import LinearGradient from 'react-native-linear-gradient'; // Nécessite installation

const Task = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <View style={styles.item}>

      <View style={styles.itemLeft}>
        {/* <TouchableOpacity onPress={() => onToggle(id)}>
          {completed ? (
            <LinearGradient
              colors={["rgb(0, 12, 187)", "rgb(224, 11, 143)"]}
              style={styles.circular}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <CheckIcon width={20} height={20} fill="#fff" />
            </LinearGradient>
          ) : (
            <View style={styles.circular} />
          )}
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => onToggle(id)}>
          <View style={[styles.circular, completed && styles.circularCompleted]}>
            {completed && (
              // <CheckIcon style={styles.iconFull} width={20} height={20} fill="#fff" />
              <CheckIcon style={styles.iconFull} />
            )}
          </View>
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.itemText, completed && styles.itemTextCompleted]}
        >
          {text}
        </Text>
      </View>

      <TouchableOpacity style={styles.crossBtn} onPress={() => onDelete(id)}>
        <View style={styles.crossIconWrapper}>
          <CrossIcon style={styles.iconFull} />
        </View>
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
  itemText: {
    color: "#808080",
    maxWidth: 500,
    fontSize: 20,
    padding: 10,
    flexShrink: 1,
  },
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

  crossBtn: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 2,
  },

  circularCompleted: {
    backgroundColor: "transparent", // pour laisser place au gradient
    backgroundImage: "linear-gradient(45deg, rgb(0, 12, 187), rgb(224, 11, 143))", // ça marche sur web seulement
  },

  crossIconWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  iconFull: {
    width: "100%",
    height: "100%",
  },
});

export default Task;
