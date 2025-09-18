'use client'

import type { MegaSenaResult } from '@/api/megaSena'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { History } from 'lucide-react'
import { CloverSix } from './loading'

interface LastResultsProps {
  loading: boolean
  draws: MegaSenaResult[]
  onClick: () => void
}

export function LastResults({ loading, draws, onClick }: LastResultsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={onClick}>
          <History />
          Ver últimos resultados
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-lg max-h-[32rem]'>
        <DialogHeader>
          <DialogTitle>Últimos 5 Resultados</DialogTitle>
        </DialogHeader>

        {loading ? (
          <CloverSix label='Buscando sorteios...' />
        ) : (
          <div className='space-y-4 h-full max-h-[28rem] overflow-auto'>
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
      </DialogContent>
    </Dialog>
  )
}
