import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MegaSenaResult } from '@/api/megaSena'

function toNumbs(arr: (number | string)[]) {
  return arr.map((n) => (typeof n === 'string' ? parseInt(n, 10) : n))
}

export function LatestResult({ data }: { data: MegaSenaResult }) {
  const numbs = toNumbs(data.dezenas).sort((a, b) => a - b)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Último Resultado</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p>
          <b>Concurso:</b> {data.concurso}
        </p>
        <p>
          <b>Data:</b> {data.data}
        </p>
        <div className='flex flex-wrap gap-2 my-2'>
          {numbs.map((n) => (
            <div key={n} className='ball ball-green'>
              {n}
            </div>
          ))}
        </div>
        <p>
          <b>Acumulou:</b>{' '}
          <span
            className={
              data.acumulou
                ? 'text-red-500 font-semibold'
                : 'text-green-500 font-semibold'
            }
          >
            {data.acumulou ? 'SIM' : 'NÃO'}
          </span>
        </p>
        {data.dataProximoConcurso && (
          <p>
            <b>Próximo sorteio:</b> {data.dataProximoConcurso}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
