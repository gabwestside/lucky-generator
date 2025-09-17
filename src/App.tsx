import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { getLast, getLatest, type MegaSenaResult } from './api/megaSena'
import { Generator } from './components/generator'
import { Header } from './components/header'
import { LastResults } from './components/last-results'
import { LatestResult } from './components/latest-result'
import { CloverFullScreen } from './components/loading'
import { type SavedGame } from './components/number-generator'
import { SavedGamesModal } from './components/saved-games-modal'
import { useLocalStorage } from './hooks/useLocalStorage'

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

  function togglePlayed(g: SavedGame) {
    setSavedGames(
      savedGames.map((x) => (x.id === g.id ? { ...x, played: !x.played } : x))
    )

    toast('Status atualizado', {
      description: g.played ? 'Marcado como NÃO jogado' : 'Marcado como jogado',
      duration: 1500,
    })
  }

  function deleteGame(g: SavedGame) {
    setSavedGames(savedGames.filter((x) => x.id !== g.id))

    toast.success('Jogo excluído', { duration: 1500 })
  }

  if (loadingInit) return <CloverFullScreen />

  return (
    <div className='min-h-screen bg-background text-foreground p-4 md:p-6'>
      <div className='mx-auto max-w-3xl space-y-6'>
        <Header openLast5={openLast5} setModalOpen={setModalOpen} />

        {latest && <LatestResult data={latest} />}

        <Generator
          canSave={canSave}
          saveGame={saveGame}
          gamesLimit={MAX_SAVED}
        />

        <SavedGamesModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          games={savedGames}
          onTogglePlayed={togglePlayed}
          onDelete={deleteGame}
        />

        {modalOpen && <LastResults loading={loadingLast5} draws={last5} />}
      </div>

      <Toaster />
    </div>
  )
}
