
import { Card, CardContent, CardHeader, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { WeightEntry } from '@/types'

type Props = {
  height: number | null;
  entries: WeightEntry[];
}

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'info' as const }
  if (bmi < 25) return { label: 'Normal', color: 'success' as const }
  if (bmi < 30) return { label: 'Sobrepeso', color: 'warning' as const }
  return { label: 'Obesidade', color: 'error' as const }
}

export default function BMICard({ height, entries }: Props) {
  const latest = entries[entries.length - 1]
  const bmi = height && latest ? +(latest.weight / (height * height)).toFixed(1) : null
  const cat = typeof bmi === 'number' ? bmiCategory(bmi) : null

  const progress = bmi ? Math.min(100, Math.max(0, ((bmi - 15) / (40 - 15)) * 100)) : 0

  return (
    <Card>
      <CardHeader title="IMC atual" subheader="Índice de Massa Corporal" />
      <CardContent>
        {bmi ? (
          <Stack spacing={2}>
            <Typography variant="h4">{bmi}</Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs>
                <LinearProgress variant="determinate" value={progress} color={cat?.color}/>
              </Grid>
              <Grid item>
                <Typography color={`${cat?.color}.main`} fontWeight={700}>{cat?.label}</Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary">
              Peso atual: <b>{latest.weight.toFixed(1)} kg</b> • Altura: <b>{height?.toFixed(2)} m</b>
            </Typography>
          </Stack>
        ) : (
          <Typography color="text.secondary">Informe sua altura e pelo menos um registro de peso.</Typography>
        )}
      </CardContent>
    </Card>
  )
}
