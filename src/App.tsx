
import { AppBar, Box, Button, Container, Grid, IconButton, Stack, Toolbar, Tooltip, Typography, Switch } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DownloadIcon from '@mui/icons-material/Download'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import BMICard from './components/BMICard'
import GoalCard from './components/GoalCard'
import WeightForm from './components/WeightForm'
import EntriesTable from './components/EntriesTable'
import TrendChart from './components/TrendChart'
import { AppData, WeightEntry } from './types'
import { loadData, saveData, exportData, importData } from './storage'
import { useMemo, useRef, useState } from 'react'
import { getTheme } from './theme'
import { ThemeProvider, CssBaseline } from '@mui/material'

export default function App() {
  const [data, setData] = useState<AppData>(() => loadData())
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const fileRef = useRef<HTMLInputElement | null>(null)

  function update(patch: Partial<AppData>) {
    const next = { ...data, ...patch }
    setData(next)
    saveData(next)
  }

  function addEntry(entry: WeightEntry) {
    const entries = [...data.entries, entry].sort((a,b)=> a.date.localeCompare(b.date))
    update({ entries })
  }

  function removeEntry(id: string) {
    update({ entries: data.entries.filter(e => e.id !== id) })
  }

  const latestWeight = useMemo(()=> data.entries[data.entries.length-1]?.weight ?? null, [data.entries])

  function handleExport() {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'weight-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const next = importData(String(reader.result))
        setData(next)
      } catch (e:any) {
        alert(e.message || 'Falha ao importar arquivo.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />

    <Box minHeight="100vh" sx={{ background: 'linear-gradient(180deg,#eef5ff 0%, #f7f9fc 30%)' }}>
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar>
          <FitnessCenterIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 800 }}>
            IMC Dashboard
          </Typography>

          <input
            hidden
            type="file"
            accept="application/json"
            ref={fileRef}
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) handleImportFile(f)
              e.currentTarget.value = ''
            }}
          />

          <Tooltip title="Importar dados (.json)">
            <IconButton onClick={()=> fileRef.current?.click()}>
              <CloudUploadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Exportar dados">
            <IconButton onClick={handleExport}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
                  <Switch checked={mode==='dark'} onChange={()=> setMode(mode==='light'?'dark':'light')} />
</Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BMICard height={data.height} entries={data.entries} />
          </Grid>
          <Grid item xs={12} md={4}>
            <GoalCard
              goalWeight={data.goalWeight}
              setGoalWeight={kg => update({ goalWeight: kg })}
              latestWeight={latestWeight}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <Button
                variant="contained"
                size="large"
                onClick={()=> {
                  const today = new Date().toISOString().slice(0,10)
                  const last = data.entries[data.entries.length-1]
                  const value = last?.date === today ? last.weight : last?.weight ?? 70
                  const e = { id: crypto.randomUUID(), date: today, weight: value }
                  addEntry(e)
                }}
              >
                Registrar hoje com último peso
              </Button>
              <Typography variant="body2" color="text.secondary">
                Dica: toque no ícone de exportar para compartilhar seus dados com alguém.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <TrendChart entries={data.entries} goalWeight={data.goalWeight} />
          </Grid>

          <Grid item xs={12}>
            <WeightForm
              onAdd={addEntry}
              height={data.height}
              setHeight={h => update({ height: h })}
            />
          </Grid>

          <Grid item xs={12}>
            <EntriesTable entries={data.entries} onRemove={removeEntry} />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </ThemeProvider>
  )
}
