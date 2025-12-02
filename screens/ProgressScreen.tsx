import { View, Text, StyleSheet, TextInput, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFitness } from '../context/FitnessContext';

interface ProgressCardProps {
  title: string;
  current: number;
  goal: number;
  progress: number;
  onGoalChange: (value: number) => void;
  unit: string;
}

export default function ProgressScreen() {
  const { 
    steps, 
    stepGoal, 
    setStepGoal,
    waterIntake,
    waterGoal,
    setWaterGoal,
    foodCalories,
    exerciseCalories,
    calorieGoal,
    setCalorieGoal
  } = useFitness();

  const stepsProgress = Math.min(100, (steps / stepGoal) * 100);
  const waterProgress = Math.min(100, (waterIntake / waterGoal) * 100);
  const netCalories = foodCalories - exerciseCalories;
  const calorieProgress = Math.min(100, (netCalories / calorieGoal) * 100);

  const ProgressCard = ({ title, current, goal, progress, onGoalChange, unit }: ProgressCardProps) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.steps}>{current}</Text>
      <Text style={styles.goal}>Goal: {goal}{unit}</Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, {width: `${progress}%`}]} />
      </View>
      <Text style={styles.progressText}>{Math.floor(progress)}%</Text>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Set Goal:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={goal.toString()}
          onChangeText={text => onGoalChange(Number(text) || 0)}
          placeholder={goal.toString()}
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Text style={styles.title}>Progress</Text>
            <ProgressCard
              title="Steps"
              current={steps}
              goal={stepGoal}
              progress={stepsProgress}
              onGoalChange={setStepGoal}
              unit=""
            />
            <ProgressCard
              title="Water Intake"
              current={waterIntake}
              goal={waterGoal}
              progress={waterProgress}
              onGoalChange={setWaterGoal}
              unit="ml"
            />
            <ProgressCard
              title="Calories"
              current={netCalories}
              goal={calorieGoal}
              progress={calorieProgress}
              onGoalChange={setCalorieGoal}
              unit="kcal"
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 60,
  },
  title: {
    color: '#4FC3F7',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
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