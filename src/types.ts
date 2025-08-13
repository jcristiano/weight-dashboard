
export type WeightEntry = {
  id: string;
  date: string; // ISO
  weight: number; // kg
}

export type AppData = {
  height: number | null; // meters
  goalWeight: number | null; // kg
  entries: WeightEntry[];
}
