import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TemperatureEntry {
  id: string;
  value: number;
  timestamp: number;
}

export interface HeartRateEntry {
  id: string;
  value: number;
  timestamp: number;
}

export interface MoodEntry {
  id: string;
  mood: 'great' | 'good' | 'okay' | 'low' | 'bad';
  energy: number; // 1-5
  notes: string;
  timestamp: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  timestamp: number;
}

export interface SleepEntry {
  id: string;
  startTime: number;
  endTime: number;
  quality: number; // 1-5
  timestamp: number;
}

interface HealthStore {
  // Temperature
  temperatures: TemperatureEntry[];
  addTemperature: (value: number) => void;

  // Heart Rate
  heartRates: HeartRateEntry[];
  addHeartRate: (value: number) => void;

  // Mood
  moods: MoodEntry[];
  addMood: (mood: MoodEntry['mood'], energy: number, notes: string) => void;

  // Food
  foods: FoodEntry[];
  addFood: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;

  // Sleep
  sleepEntries: SleepEntry[];
  addSleep: (startTime: number, endTime: number, quality: number) => void;
}

const useHealthStore = create<HealthStore>()(
  persist(
    (set, get) => ({
      temperatures: [],
      addTemperature: (value) => set({
        temperatures: [
          { id: Date.now().toString(), value, timestamp: Date.now() },
          ...get().temperatures
        ]
      }),

      heartRates: [],
      addHeartRate: (value) => set({
        heartRates: [
          { id: Date.now().toString(), value, timestamp: Date.now() },
          ...get().heartRates
        ]
      }),

      moods: [],
      addMood: (mood, energy, notes) => set({
        moods: [
          { id: Date.now().toString(), mood, energy, notes, timestamp: Date.now() },
          ...get().moods
        ]
      }),

      foods: [],
      addFood: (entry) => set({
        foods: [
          { id: Date.now().toString(), ...entry, timestamp: Date.now() },
          ...get().foods
        ]
      }),

      sleepEntries: [],
      addSleep: (startTime, endTime, quality) => set({
        sleepEntries: [
          { id: Date.now().toString(), startTime, endTime, quality, timestamp: Date.now() },
          ...get().sleepEntries
        ]
      }),
    }),
    {
      name: "health-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useHealthStore;
