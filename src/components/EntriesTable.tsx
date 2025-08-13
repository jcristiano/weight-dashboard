
import { Card, CardContent, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { WeightEntry } from '@/types'

type Props = {
  entries: WeightEntry[]
  onRemove: (id: string) => void
}

export default function EntriesTable({ entries, onRemove }: Props) {
  return (
    <Card>
      <CardHeader title="Registros" subheader="Seu histórico de peso" />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Peso (kg)</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id} hover>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.weight.toFixed(1)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Remover">
                    <IconButton onClick={()=> onRemove(e.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {entries.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" style={{ opacity: 0.6 }}>
                  Sem registros ainda
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
