
import { Card, CardActions, CardContent, CardHeader, Slider, Stack, TextField, Tooltip, Typography, Button } from '@mui/material'

type Props = {
  goalWeight: number | null
  setGoalWeight: (kg: number | null) => void
  latestWeight: number | null
}

export default function GoalCard({ goalWeight, setGoalWeight, latestWeight }: Props) {
  const handleSlider = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') setGoalWeight(value)
  }

  return (
    <Card>
      <CardHeader title="Meta de peso" subheader="Defina sua meta e acompanhe o progresso" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Meta (kg)"
            type="number"
            inputProps={{ step: 0.1, min: 30, max: 250 }}
            value={goalWeight ?? ''}
            onChange={e => setGoalWeight(e.target.value ? Number(e.target.value) : null)}
            fullWidth
          />
          <Tooltip title="Ajuste com base no último peso registrado">
            <Slider
              value={goalWeight ?? latestWeight ?? 70}
              onChange={handleSlider}
              min={30}
              max={200}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Tooltip>
          {goalWeight && latestWeight && (
            <Typography>
              Faltam <b>{(latestWeight - goalWeight).toFixed(1)} kg</b> para atingir sua meta.
            </Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={()=> setGoalWeight(null)}>Limpar meta</Button>
      </CardActions>
    </Card>
  )
}
