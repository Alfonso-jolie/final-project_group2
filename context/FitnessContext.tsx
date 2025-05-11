import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';

interface FitnessContextType {
  calorieGoal: number;
  setCalorieGoal: (n: number) => void;
  foodCalories: number;
  setFoodCalories: (n: number) => void;
  exerciseCalories: number;
  setExerciseCalories: (n: number) => void;
  steps: number;
  setSteps: (n: number) => void;
  stepGoal: number;
  setStepGoal: (n: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [calorieGoal, setCalorieGoal] = useState(1650);
  const [foodCalories, setFoodCalories] = useState(0);
  const [exerciseCalories, setExerciseCalories] = useState(0);
  const [steps, setSteps] = useState(0);
  const [stepGoal, setStepGoal] = useState(10000);

  // Real-time pedometer logic
  useEffect(() => {
    let subscription: { remove: () => void } | undefined;
    const setupPedometer = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        if (isAvailable) {
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);
          try {
            const result = await Pedometer.getStepCountAsync(startOfDay, new Date());
            setSteps(result.steps);
          } catch (error) {
            // Optionally handle error
          }
          subscription = Pedometer.watchStepCount(result => {
            setSteps(result.steps);
          });
        }
      } catch (error) {
        // Optionally handle error
      }
    };
    setupPedometer();
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <FitnessContext.Provider
      value={{
        calorieGoal,
        setCalorieGoal,
        foodCalories,
        setFoodCalories,
        exerciseCalories,
        setExerciseCalories,
        steps,
        setSteps,
        stepGoal,
        setStepGoal,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const ctx = useContext(FitnessContext);
  if (!ctx) throw new Error('useFitness must be used within FitnessProvider');
  return ctx;
} 