
import { Card, CardContent, CardHeader } from '@mui/material'
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { WeightEntry } from '@/types'

type Props = {
  entries: WeightEntry[]
  goalWeight: number | null
}

function movingAverage(data: any[], windowSize: number) {
  const result: any[] = []
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1)
    const slice = data.slice(start, i + 1)
    const avg = slice.reduce((sum, d) => sum + d.weight, 0) / slice.length
    result.push({ ...data[i], avg })
  }
  return result
}

export default function TrendChart({ entries, goalWeight }: Props) {
  const data = entries.map(e => ({ date: e.date.slice(5), weight: e.weight }))
  const withAvg = movingAverage(data, 3)

  return (
    <Card>
      <CardHeader title="Tendência de peso" subheader="Acompanhe sua evolução" />
      <CardContent style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={withAvg} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} unit=" kg" />
            <RTooltip />
            <Line type="monotone" dataKey="weight" dot={true} />
            <Line type="monotone" dataKey="avg" strokeDasharray="5 5" />
            {goalWeight && <ReferenceLine y={goalWeight} stroke="red" strokeDasharray="4 4" label="Meta" />}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
