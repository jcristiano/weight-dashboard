
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { WeightEntry } from '@/types'

type Props = {
  onAdd: (entry: WeightEntry) => void
  height: number | null
  setHeight: (h: number | null) => void
}

export default function WeightForm({ onAdd, height, setHeight }: Props) {
  const [weight, setWeight] = useState<number | ''>('')
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0,10))

  const canSave = weight !== '' && !!date

  function handleAdd() {
    if (weight === '') return
    onAdd({
      id: crypto.randomUUID(),
      weight: Number(weight),
      date
    })
    setWeight('')
  }

  return (
    <Card>
      <CardHeader title="Novo registro" subheader="Informe seu peso e a data do registro" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Peso (kg)"
              type="number"
              inputProps={{ step: 0.1, min: 20, max: 300 }}
              value={weight}
              onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Data"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Altura (m)"
              type="number"
              inputProps={{ step: 0.01, min: 1.2, max: 2.5 }}
              value={height ?? ''}
              onChange={e => setHeight(e.target.value ? Number(e.target.value) : null)}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleAdd} disabled={!canSave}>Adicionar</Button>
      </CardActions>
    </Card>
  )
}
