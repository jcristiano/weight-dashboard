
import { AppData } from './types'

const KEY = 'weight-dashboard:data:v1'

export function loadData(): AppData {
  const raw = localStorage.getItem(KEY)
  if (!raw) return { height: null, goalWeight: null, entries: [] }
  try {
    const parsed = JSON.parse(raw) as AppData
    parsed.entries = parsed.entries
      .filter(e => typeof e.weight === 'number' && !!e.date)
      .sort((a,b)=> a.date.localeCompare(b.date))
    return parsed
  } catch {
    return { height: null, goalWeight: null, entries: [] }
  }
}

export function saveData(data: AppData) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function exportData(): string {
  return JSON.stringify(loadData(), null, 2)
}

export function importData(json: string): AppData {
  const obj = JSON.parse(json) as AppData
  if (!obj || !Array.isArray(obj.entries)) throw new Error('Arquivo inválido')
  const normalized: AppData = {
    height: obj.height ?? null,
    goalWeight: obj.goalWeight ?? null,
    entries: obj.entries
      .map(e => ({
        id: e.id || crypto.randomUUID(),
        date: new Date(e.date).toISOString().slice(0,10),
        weight: Number(e.weight)
      }))
      .filter(e => !isNaN(e.weight) && !!e.date)
      .sort((a,b)=> a.date.localeCompare(b.date))
  }
  saveData(normalized)
  return normalized
}
