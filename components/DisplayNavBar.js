import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DisplayNavBar = ({ upDateTaskItems, clearCompletedTasks, numberOfTasks }) => {
    return (
        <View style={styles.navBar}>
            <View style={styles.itemsLeft}>
                <Text style={styles.navText}>{numberOfTasks} items left</Text>
            </View>
            <View   style={styles.buttons}>
                <TouchableOpacity onPress={() => upDateTaskItems('all')}>
                    <Text style={styles.navText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => upDateTaskItems('active')}>

                    <Text style={styles.navText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => upDateTaskItems('completed')}>

                    <Text style={styles.navText}>Completed</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() =>clearCompletedTasks()}>
                <Text style={styles.navText}>Clear Completed</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flex: 1,
        width: '100%',
        height: '4vh',
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "flex-start",
        alignItems: "center",
        padding: 10,
        // backgroundColor: '#2e4054',
        marginHorizontal: 'auto',
        borderRadiusBottom: 10,
        bottom: 0,
        position: 'absolute',
        borderTopColor: "#808080",
        borderTopWidth: 2,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "flex-start",
        alignItems: "center",
        gap: 30,
    },
    navText: {
        fontSize: 18,
        color: "#808080",
        top: 15,
    },
});

export default DisplayNavBar;