import { Separator } from '@radix-ui/react-separator'
import { NumberGenerator } from './number-generator'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface GeneratorProps {
  canSave: boolean
  saveGame: (numbers: number[]) => void
  gamesLimit: number
}

export function Generator({ canSave, saveGame, gamesLimit }: GeneratorProps) {
  return (
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
              Limite de {gamesLimit} jogos salvos atingido. Exclua algum para
              salvar novos.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
