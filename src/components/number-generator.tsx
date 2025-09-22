import { Button } from '@/components/ui/button'
import { CloudLightning, SaveIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export type SavedGame = {
  id: string
  numbers: number[]
  createdAt: string
  played: boolean
}

const BALL_COUNT = 6

export function NumberGenerator({
  canSave,
  onSave,
}: {
  canSave: boolean
  onSave: (numbs: number[]) => void
}) {
  const [isGenerating, setGenerating] = useState(false)

  const [finalNumbs, setFinalNumbs] = useState<number[]>([])
  const [displayNumbs, setDisplayNumbs] = useState<number[]>(() =>
    Array.from({ length: BALL_COUNT }, () => 0)
  )

  const [settled, setSettled] = useState<boolean[]>(() =>
    Array.from({ length: BALL_COUNT }, () => false)
  )

  const plimRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    plimRef.current = new Audio('/sounds/plim.mp3')
  }, [])

  function uniqueRandomSet(size: number, min = 1, max = 60) {
    const s = new Set<number>()
    while (s.size < size)
      s.add(Math.floor(Math.random() * (max - min + 1)) + min)
    return [...s].sort((a, b) => a - b)
  }

  async function generate() {
    if (isGenerating) return
    setGenerating(true)

    setSettled(Array.from({ length: BALL_COUNT }, () => false))

    const finals = uniqueRandomSet(BALL_COUNT)
    setFinalNumbs(finals)

    setDisplayNumbs(
      Array.from(
        { length: BALL_COUNT },
        () => Math.floor(Math.random() * 60) + 1
      )
    )

    for (let i = 0; i < BALL_COUNT; i++) {
      const swaps = 10 + Math.floor(Math.random() * 9)

      for (let j = 0; j < swaps; j++) {
        setDisplayNumbs((prev) => {
          const next = [...prev]
          let candidate = Math.floor(Math.random() * 60) + 1
          if (candidate === next[i]) candidate = ((candidate + 7) % 60) + 1
          next[i] = candidate
          return next
        })

        const step = 28 + j * 10

        await new Promise((r) => setTimeout(r, step))
      }

      setDisplayNumbs((prev) => {
        const next = [...prev]
        next[i] = finals[i]
        return next
      })
      setSettled((prev) => {
        const next = [...prev]
        next[i] = true
        return next
      })

      try {
        if (plimRef.current) {
          plimRef.current.currentTime = 0

          await plimRef.current.play().catch(() => {})
        }
      } catch {
        /* empty */
      }

      await new Promise((r) => setTimeout(r, 120))
    }

    setGenerating(false)
  }

  const allSettled = settled.every(Boolean)

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2 justify-center'>
        {displayNumbs.map((n, idx) => {
          const isSet = settled[idx]

          const animClass = isSet
            ? 'animate-jackpot-pop'
            : 'animate-jackpot-tick'
          const colorClass = isSet ? 'ball-blue' : 'ball-ghost'

          return (
            <div
              key={idx}
              className={`ball ${colorClass} ${animClass}`}
              style={{
                animationDelay: isSet ? '0ms' : `${idx * 40}ms`,
              }}
            >
              {n || '--'}
            </div>
          )
        })}
      </div>

      <div className='flex gap-2 justify-center'>
        <Button variant='outline' onClick={generate} disabled={isGenerating}>
          <CloudLightning className='mr-1' />
          {isGenerating ? 'Gerando...' : 'Gerar Números'}
        </Button>

        {allSettled && canSave && (
          <Button variant='secondary' onClick={() => onSave(finalNumbs)}>
            <SaveIcon className='mr-1' />
            Salvar jogo
          </Button>
        )}
      </div>
    </div>
  )
}
