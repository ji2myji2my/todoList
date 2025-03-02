import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task'

export default function App() {
  return (
    <View style={styles.container}>
        {/* Today's Tasks*/}
        <View style={styles.tasksWrapper}>

          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <View style={styles.item}>
            {/* This is where the tasks will go */}
            <Task text={'Task 1'} />
            <Task text={'Task 2'} />
            <Task text={'Task 3'} />
            <Task text={'Task 4'} />
            <Task text={'Task 5'} />
            <Task text={'Task 6'} />
          </View>
        
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 30,
    
  },
});
