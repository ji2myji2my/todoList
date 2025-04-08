import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DisplayNavBar = ({ state, clearCompletedFn }) => {

    const handleStateChange = (newState) => {}

    return (
        <View style={styles.navBar}>
            <View style={styles.itemsLeft}>
                <Text style={styles.navText}>items left</Text>
            </View>
            {/* <TouchableOpacity onPress={all}> */}
            <TouchableOpacity >
                <Text style={styles.navText}>All</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={active}> */}
            <TouchableOpacity >
                <Text style={styles.navText}>Active</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={completed}> */}
            <TouchableOpacity >
                <Text style={styles.navText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearCompletedFn()}>
                <Text style={styles.navText}>Clear Completed</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    navBar: {
        flex: 1,
        width: '90%',
        // height: '15%',
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: '#2e4054',
        marginHorizontal: 'auto',
        borderRadius: 10,
    },
    navText: {
        fontSize: 18,
        color: "#FFF",
    },
});

export default DisplayNavBar;