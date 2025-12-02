// All values in this screen are now live and synced with Diary and Progress via context.
import { View, Text, StyleSheet } from 'react-native';
import { useFitness } from '../context/FitnessContext';

export default function HomeScreen() {
  const { calorieGoal, foodCalories, exerciseCalories, steps, stepGoal } = useFitness();
  const remainingCalories = calorieGoal - foodCalories + exerciseCalories;

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>FitJourney</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calories Remaining</Text>
        <Text style={styles.value}>{remainingCalories}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Steps</Text>
        <Text style={styles.value}>{steps}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exercise</Text>
        <Text style={styles.value}>{exerciseCalories} kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 16,
  },
  appName: {
    color: '#4FC3F7',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 16,
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: '#23263A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    color: '#4FC3F7',
    fontSize: 32,
    fontWeight: 'bold',
  },
}); 