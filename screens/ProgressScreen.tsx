import { View, Text, StyleSheet, TextInput, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useFitness } from '../context/FitnessContext';

export default function ProgressScreen() {
  const { steps, stepGoal, setStepGoal } = useFitness();
  const progress = Math.min(100, (steps / stepGoal) * 100);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Progress</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Steps</Text>
          <Text style={styles.steps}>{steps}</Text>
          <Text style={styles.goal}>Goal: {stepGoal}</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {width: `${progress}%`}]} />
          </View>
          <Text style={styles.progressText}>{Math.floor(progress)}%</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Set Goal:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={stepGoal.toString()}
              onChangeText={text => setStepGoal(Number(text) || 0)}
              placeholder="10000"
              placeholderTextColor="#888"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 16,
  },
  title: {
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
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  steps: {
    color: '#4FC3F7',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  goal: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 12,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    width: '100%',
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#4FC3F7',
    borderRadius: 5,
  },
  progressText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  inputLabel: {
    color: '#aaa',
    fontSize: 15,
    marginRight: 6,
  },
  input: {
    backgroundColor: '#181A20',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    fontSize: 15,
    width: 90,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#333',
    textAlign: 'center',
  },
}); 