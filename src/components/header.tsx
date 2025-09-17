import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

interface HeaderProps {
  openLast5: () => void
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({ openLast5, setModalOpen }: HeaderProps) {
  return (
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
  )
}
