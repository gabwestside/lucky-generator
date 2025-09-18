import type { MegaSenaResult } from '@/api/megaSena'
import React from 'react'
import { LastResults } from './last-results'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

interface HeaderProps {
  openLast5: () => void
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  draws: MegaSenaResult[]
}

export function Header({
  openLast5,
  setModalOpen,
  loading,
  draws,
}: HeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>Gerador da sorte 🍀</h1>
      <div className='flex gap-2'>
        <LastResults loading={loading} draws={draws} onClick={openLast5} />

        <Button variant='outline' onClick={() => setModalOpen(true)}>
          Jogos salvos
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
