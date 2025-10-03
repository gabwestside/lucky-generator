'use client'

import type { MegaSenaResult } from '@/api/megaSena'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, SaveAll } from 'lucide-react'
import React from 'react'
import { LastResults } from './last-results'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

interface HeaderProps {
  openLast5: () => void
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  draws: MegaSenaResult[]
}

// type GameKey = 'megasena' | 'quina'

// type GameRule = {
//   label: string
//   apiKey: GameKey
//   min: number
//   max: number
//   drawCount: number
//   info: string
// }

// const RULES: Record<GameKey, GameRule> = {
//   megasena: {
//     label: 'Mega-Sena',
//     apiKey: 'megasena',
//     min: 1,
//     max: 60,
//     drawCount: 6,
//     info: '6 dezenas entre 01 e 60. Último resultado, acumulou e próxima data.',
//   },
//   quina: {
//     label: 'Quina',
//     apiKey: 'quina',
//     min: 1,
//     max: 80,
//     drawCount: 5,
//     info: '5 dezenas entre 01 e 80. Exibe concurso, data e dezenas.',
//   },
// }

export function Header({
  openLast5,
  setModalOpen,
  loading,
  draws,
}: HeaderProps) {
  // const [game, setGame] = useState<GameKey>('megasena')
  // const rule = RULES[game]

  const content = (
    <>
      <LastResults loading={loading} draws={draws} onClick={openLast5} />

      <Button variant='outline' onClick={() => setModalOpen(true)}>
        <SaveAll />
        Jogos salvos
      </Button>
      <ThemeToggle />

      <div className='flex items-start justify-between'>
        {/* <div>
          <div>Escolha a modalidade</div>
          <p className='text-sm text-muted-foreground flex items-center gap-1 mt-1'>
            <Info size={14} /> {rule.info}
          </p>
        </div> */}
        {/* <Select value={game} onValueChange={(v) => setGame(v as GameKey)}>
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='Jogo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='megasena'>Mega-Sena</SelectItem>
            <SelectItem value='quina'>Quina</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </>
  )

  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>Gerador da sorte 🍀</h1>

      <div className='hidden md:flex gap-2'>{content}</div>

      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <Menu className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent
            side='right'
            className='flex flex-col justify-end gap-4 p-4'
          >
            {content}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
