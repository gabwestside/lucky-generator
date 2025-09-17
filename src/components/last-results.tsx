import type { MegaSenaResult } from '@/api/megaSena'
import { CloverSix } from './loading'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface LastResultsProps {
  loading: boolean
  draws: MegaSenaResult[]
}

export function LastResults({ loading, draws }: LastResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos 5 Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <CloverSix label='Buscando sorteios...' />
        ) : (
          <div className='space-y-4'>
            {draws.map((draw) => (
              <div key={draw.concurso} className='rounded-lg border p-3'>
                <div className='text-sm opacity-70'>
                  Concurso {draw.concurso} — {draw.data}
                </div>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {(
                    (Array.isArray(draw.dezenas) ? draw.dezenas : []) as (
                      | number
                      | string
                    )[]
                  )
                    .map((x) => (typeof x === 'string' ? parseInt(x, 10) : x))
                    .sort((a, b) => a - b)
                    .map((n) => (
                      <div key={n} className='ball ball-green'>
                        {n}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
