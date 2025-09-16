import { useEffect, useState } from 'react'
import { getLatest, getLast, type MegaSenaResult } from './api/megaSena'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { NumberGenerator, type SavedGame } from './components/number-generator'
import { CloverFullScreen, CloverSix } from './components/loading'
import { ThemeToggle } from './components/theme-toggle'
import { LatestResult } from './components/lastest-result'
import { SavedGamesModal } from './components/saved-games-modal'
import { Toaster, toast } from 'sonner'

const MAX_SAVED = 5

export function App() {
  const [latest, setLatest] = useState<MegaSenaResult | null>(null)
  const [loadingInit, setLoadingInit] = useState(true)

  const [savedGames, setSavedGames] = useLocalStorage<SavedGame[]>(
    'savedGames',
    []
  )
  const canSave = savedGames.length < MAX_SAVED

  const [modalOpen, setModalOpen] = useState(false)
  const [loadingLast5, setLoadingLast5] = useState(false)
  const [last5, setLast5] = useState<MegaSenaResult[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getLatest()
        setLatest(res)
      } finally {
        setLoadingInit(false)
      }
    })()
  }, [])

  async function openLast5() {
    setModalOpen(true)
    if (last5.length === 0) {
      setLoadingLast5(true)
      try {
        const res = await getLast(5)
        setLast5(res)
      } finally {
        setLoadingLast5(false)
      }
    }
  }

  function saveGame(numbs: number[]) {
    if (!canSave) {
      toast.warning('Limite atingido', {
        description: 'Você pode salvar até 5 jogos.',
      })
      return
    }

    const exists = savedGames.some(
      (g) =>
        g.numbers.slice().sort().join(',') === numbs.slice().sort().join(',')
    )

    if (exists) {
      toast.info('Já salvo', { description: 'Esse jogo já está na sua lista.' })
      return
    }

    const newGame: SavedGame = {
      id: crypto.randomUUID(),
      numbers: numbs,
      createdAt: new Date().toISOString(),
      played: false,
    }
    setSavedGames([...savedGames, newGame])

    toast.success('Jogo salvo!', {
      description: 'Boa sorte 🍀',
      action: {
        label: 'Ver jogos',
        onClick: () => setModalOpen(true),
      },
      duration: 2000,
    })
  }

  // function togglePlayed(g: SavedGame) {
  //   setSavedGames(
  //     savedGames.map((x) => (x.id === g.id ? { ...x, played: !x.played } : x))
  //   )

  //   toast('Status atualizado', {
  //     description: g.played ? 'Marcado como NÃO jogado' : 'Marcado como jogado',
  //     duration: 1500,
  //   })
  // }

  // function deleteGame(g: SavedGame) {
  //   setSavedGames(savedGames.filter((x) => x.id !== g.id))

  //   toast.success('Jogo excluído', { duration: 1500 })
  // }

  if (loadingInit) return <CloverFullScreen />

  return (
    <div className='min-h-screen bg-background text-foreground p-4 md:p-6'>
      <div className='mx-auto max-w-3xl space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Gerador da sorte 🍀</h1>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={openLast5}>
              Ver últimos 5 resultados
            </Button>
            <Button variant='outline' onClick={() => setModalOpen(true)}>
              Jogos salvos
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {latest && <LatestResult data={latest} />}

        <Card>
          <CardHeader>
            <CardTitle>Gerador</CardTitle>
          </CardHeader>
          <CardContent>
            <NumberGenerator canSave={canSave} onSave={saveGame} />
            {!canSave && (
              <>
                <Separator className='my-3' />
                <p className='text-sm text-muted-foreground'>
                  Limite de {MAX_SAVED} jogos salvos atingido. Exclua algum para
                  salvar novos.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <SavedGamesModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          games={[]} // este modal é só para jogos salvos, então criamos outro card inline p/ últimos 5
          onTogglePlayed={() => {}}
          onDelete={() => {}}
        />

        {modalOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Últimos 5 Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingLast5 ? (
                <CloverSix label='Buscando sorteios...' />
              ) : (
                <div className='space-y-4'>
                  {last5.map((r) => (
                    <div key={r.concurso} className='rounded-lg border p-3'>
                      <div className='text-sm opacity-70'>
                        Concurso {r.concurso} — {r.data}
                      </div>
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {(
                          (Array.isArray(r.dezenas) ? r.dezenas : []) as (
                            | number
                            | string
                          )[]
                        )
                          .map((x) =>
                            typeof x === 'string' ? parseInt(x, 10) : x
                          )
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
        )}
      </div>

      <Toaster />
    </div>
  )
}
