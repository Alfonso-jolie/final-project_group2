import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useFitness } from '../context/FitnessContext';

const initialSections = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'exercise', label: 'Exercise' },
];

type Entry = { name: string; calories: number };
type InputState = { name: string; calories: string };
type EntriesState = {
  breakfast: Entry[];
  lunch: Entry[];
  dinner: Entry[];
  snacks: Entry[];
  exercise: Entry[];
};
type InputStates = {
  breakfast: InputState;
  lunch: InputState;
  dinner: InputState;
  snacks: InputState;
  exercise: InputState;
};
type WaterLog = { amount: number; unit: string }[];

export default function DiaryScreen() {
  const {
    calorieGoal,
    setCalorieGoal,
    foodCalories,
    setFoodCalories,
    exerciseCalories,
    setExerciseCalories,
    waterIntake,
    setWaterIntake,
    waterGoal,
    setWaterGoal,
  } = useFitness();
  const remainingCalories = calorieGoal - foodCalories + exerciseCalories;

  // State for food and exercise entries
  const [entries, setEntries] = useState<EntriesState>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
    exercise: [],
  });
  const [input, setInput] = useState<InputStates>({
    breakfast: { name: '', calories: '' },
    lunch: { name: '', calories: '' },
    dinner: { name: '', calories: '' },
    snacks: { name: '', calories: '' },
    exercise: { name: '', calories: '' },
  });

  // Water state
  const [waterAmount, setWaterAmount] = useState('');
  const [waterUnit, setWaterUnit] = useState('ml');
  const [waterLog, setWaterLog] = useState<WaterLog>([]);
  const [waterGoalInput, setWaterGoalInput] = useState('');

  // Calculate total water logged
  const totalWater = waterLog.reduce((sum, entry) => sum + (entry.unit === waterUnit ? entry.amount : (waterUnit === 'ml' ? entry.amount * 29.5735 : entry.amount / 29.5735)), 0);
  const progress = Math.min(totalWater / waterGoal, 1);

  // Helper to recalculate total food calories
  const recalculateFoodCalories = (newEntries: EntriesState) => {
    const foodSections: (keyof EntriesState)[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
    const total = foodSections.reduce((sum, key) => sum + newEntries[key].reduce((s, e) => s + e.calories, 0), 0);
    setFoodCalories(total);
  };

  const addEntry = (section: keyof EntriesState) => {
    const { name, calories } = input[section];
    if (!name || !calories) return;
    const newEntries = {
      ...entries,
      [section]: [...entries[section], { name, calories: Number(calories) }],
    };
    setEntries(newEntries);
    setInput(prev => ({
      ...prev,
      [section]: { name: '', calories: '' },
    }));
    if (section === 'exercise') {
      // Update exercise calories
      const total = newEntries.exercise.reduce((sum, e) => sum + e.calories, 0);
      setExerciseCalories(total);
    } else {
      // Update food calories
      recalculateFoodCalories(newEntries);
    }
  };

  const addWater = (amount?: string) => {
    const value = Number(amount || waterAmount);
    if (!value) return;
    const newWaterLog = [...waterLog, { amount: value, unit: waterUnit }];
    setWaterLog(newWaterLog);
    setWaterAmount('');
    
    // Update water intake in FitnessContext
    const totalWater = newWaterLog.reduce((sum, entry) => 
      sum + (entry.unit === 'ml' ? entry.amount : entry.amount * 29.5735), 0);
    setWaterIntake(totalWater);
  };

  const handleWaterPreset = (preset: number) => {
    setWaterAmount((Number(waterAmount) + preset).toString());
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.title}>Diary</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Calories</Text>
          <View style={styles.row}><Text style={styles.label}>Goal</Text><Text style={styles.value}>{calorieGoal}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Food</Text><Text style={styles.value}>{foodCalories}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Exercise</Text><Text style={styles.value}>{exerciseCalories}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Remaining</Text><Text style={styles.value}>{remainingCalories}</Text></View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Food:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={foodCalories.toString()}
              onChangeText={(text: string) => setFoodCalories(Number(text) || 0)}
              placeholder="0"
              placeholderTextColor="#888"
            />
            <Text style={styles.inputLabel}>Exercise:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={exerciseCalories.toString()}
              onChangeText={(text: string) => setExerciseCalories(Number(text) || 0)}
              placeholder="0"
              placeholderTextColor="#888"
            />
          </View>
        </View>
        {/* Food & Exercise Sections */}
        {initialSections.map(section => (
          <View style={styles.card} key={section.key}>
            <Text style={styles.cardTitle}>{section.label}</Text>
            <FlatList
              data={entries[section.key as keyof EntriesState]}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => (
                <View style={styles.entryRow}>
                  <Text style={styles.entryName}>{item.name}</Text>
                  <Text style={styles.entryCalories}>{item.calories} kcal</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>No entries yet.</Text>}
            />
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder={`Add ${section.label === 'Exercise' ? 'exercise' : 'food/drink'}`}
                placeholderTextColor="#888"
                value={input[section.key as keyof InputStates].name}
                onChangeText={text => setInput(prev => ({ ...prev, [section.key]: { ...prev[section.key as keyof InputStates], name: text } }))}
              />
              <TextInput
                style={[styles.input, { width: 70, marginLeft: 8 }]}
                placeholder="kcal"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={input[section.key as keyof InputStates].calories}
                onChangeText={text => setInput(prev => ({ ...prev, [section.key]: { ...prev[section.key as keyof InputStates], calories: text } }))}
              />
              <TouchableOpacity style={styles.addBtn} onPress={() => addEntry(section.key as keyof EntriesState)}>
                <Text style={{ color: '#4FC3F7', fontWeight: 'bold', fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* Water Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Water</Text>
          {/* Water bottles emoji */}
          <View style={{ alignItems: 'center', marginVertical: 12 }}>
            <Text style={{ fontSize: 60 }}>🥛🥛🥛</Text>
          </View>
          {/* Water Goal Input */}
          <View style={styles.waterGoalRow}>
            <Text style={{ color: '#fff', fontSize: 16, marginRight: 8 }}>Goal:</Text>
            <TextInput
              style={[styles.input, { width: 80, textAlign: 'center', fontSize: 16 }]}
              keyboardType="numeric"
              value={waterGoalInput}
              onChangeText={setWaterGoalInput}
              placeholder={waterGoal.toString()}
              placeholderTextColor="#888"
            />
            <Text style={{ color: '#fff', fontSize: 16, marginLeft: 4 }}>{waterUnit}</Text>
            <TouchableOpacity
              style={styles.setGoalBtn}
              onPress={() => {
                const val = Number(waterGoalInput);
                if (val > 0) {
                  setWaterGoal(val);
                  setWaterGoalInput('');
                }
              }}
            >
              <Text style={{ color: '#4FC3F7', fontWeight: 'bold' }}>Set</Text>
            </TouchableOpacity>
          </View>
          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={{ color: '#fff', fontSize: 15, alignSelf: 'center', marginBottom: 8 }}>{`${Math.round(totalWater)} / ${waterGoal} ${waterUnit} (${Math.round(progress * 100)}%)`}</Text>
          <View style={styles.waterInputRow}>
            <TextInput
              style={[styles.input, { textAlign: 'center', fontSize: 22, width: 90 }]}
              keyboardType="numeric"
              value={waterAmount}
              onChangeText={setWaterAmount}
              placeholder="0"
              placeholderTextColor="#888"
            />
            <Text style={{ color: '#fff', fontSize: 20, marginLeft: 8 }}>{waterUnit}</Text>
          </View>
          <View style={styles.waterPresetRow}>
            {[250, 500, 1000].map((preset) => (
              <TouchableOpacity key={preset} style={styles.waterPresetBtn} onPress={() => handleWaterPreset(preset)}>
                <Text style={{ color: '#fff', fontSize: 16 }}>{`+${preset} ml`}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addWaterBtn} onPress={() => addWater()}>
            <Text style={{ color: '#4FC3F7', fontWeight: 'bold', fontSize: 18 }}>Add Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changeUnitRow} onPress={() => setWaterUnit(waterUnit === 'ml' ? 'oz' : 'ml')}>
            <Text style={{ color: '#aaa', fontSize: 15 }}>⚙ Change Unit</Text>
          </TouchableOpacity>
          <FlatList
            data={waterLog}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <Text style={{ color: '#fff', fontSize: 15, marginTop: 2 }}>{`+${item.amount} ${item.unit}`}</Text>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No water logged yet.</Text>}
          />
        </View>
      </ScrollView>
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
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    color: '#aaa',
    fontSize: 15,
  },
  value: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
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
    width: 70,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  entryName: {
    color: '#fff',
    fontSize: 15,
  },
  entryCalories: {
    color: '#4FC3F7',
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  addBtn: {
    marginLeft: 8,
    backgroundColor: '#23263A',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#4FC3F7',
  },
  waterInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  waterPresetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  waterPresetBtn: {
    backgroundColor: '#181A20',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  addWaterBtn: {
    backgroundColor: '#23263A',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4FC3F7',
    marginBottom: 8,
  },
  changeUnitRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  waterGoalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  setGoalBtn: {
    marginLeft: 8,
    backgroundColor: '#23263A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#4FC3F7',
  },
  progressBarBg: {
    height: 14,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
    marginHorizontal: 10,
  },
  progressBarFill: {
    height: 14,
    backgroundColor: '#4FC3F7',
    borderRadius: 8,
  },
}); 