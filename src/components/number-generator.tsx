import { Button } from '@/components/ui/button'
import { CloudLightning, SaveIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CloverSix } from './loading'

export type SavedGame = {
  id: string
  numbers: number[]
  createdAt: string
  played: boolean
}

export function NumberGenerator({
  canSave,
  onSave,
}: {
  canSave: boolean
  onSave: (numbs: number[]) => void
}) {
  const [isGenerating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<number[]>([])
  const [revealed, setRevealed] = useState<number[]>([])
  const plimRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    plimRef.current = new Audio('/sounds/plim.mp3')
  }, [])

  async function generate() {
    setGenerating(true)
    setRevealed([])

    await new Promise((r) => setTimeout(r, 600))

    const s = new Set<number>()

    while (s.size < 6) s.add(Math.floor(Math.random() * 60) + 1)

    const arr = [...s].sort((a, b) => a - b)
    setGenerated(arr)

    for (const n of arr) {
      setRevealed((prev) => [...prev, n])
      try {
        if (plimRef.current) {
          plimRef.current.currentTime = 0

          await plimRef.current.play().catch(() => {})
        }
      } catch {
        /* empty */
      }

      await new Promise((r) => setTimeout(r, 350))
    }
    setGenerating(false)
  }

  return (
    <div className='space-y-4'>
      {isGenerating ? (
        <CloverSix label='Calculando sua sorte...' />
      ) : (
        <>
          <div className='flex flex-wrap gap-2 justify-center'>
            {revealed.map((n) => (
              <div key={n} className='ball ball-blue'>
                {n}
              </div>
            ))}
          </div>
          <div className='flex gap-2 justify-center'>
            <Button
              variant='outline'
              onClick={generate}
              disabled={isGenerating}
            >
              <CloudLightning />
              Gerar Números
            </Button>
            {revealed.length === 6 && canSave && (
              <Button variant='secondary' onClick={() => onSave(generated)}>
                <SaveIcon />
                Salvar jogo
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
