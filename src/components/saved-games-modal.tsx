import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SavedGame } from './number-generator'

export function SavedGamesModal({
  open,
  onOpenChange,
  games,
  onTogglePlayed,
  onDelete,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  games: SavedGame[]
  onTogglePlayed: (g: SavedGame) => void
  onDelete: (g: SavedGame) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Jogos Salvos 🍀</DialogTitle>
        </DialogHeader>

        {games.length === 0 ? (
          <p className='opacity-70'>Nenhum jogo salvo.</p>
        ) : (
          <ul className='space-y-2'>
            {[...games]
              .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
              .map((g) => (
                <li
                  key={g.id}
                  className='flex items-center justify-between gap-2 rounded-lg border p-3'
                >
                  <div>
                    <div className='text-xs opacity-70'>
                      {new Date(g.createdAt).toLocaleString()}
                    </div>
                    <div className='font-medium'>
                      {g.numbers
                        .slice()
                        .sort((a, b) => a - b)
                        .join(', ')}
                    </div>
                    <div
                      className={`text-xs ${
                        g.played ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      {g.played ? '✅ Jogado' : '⏳ Não jogado'}
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm' onClick={() => onTogglePlayed(g)}>
                      {g.played ? 'Desmarcar' : 'Marcar' }
                    </Button>
                    <Button variant='destructive' size='sm' onClick={() => onDelete(g)}>
                      Excluir
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}
