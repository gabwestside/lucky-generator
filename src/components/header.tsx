'use client'

import type { MegaSenaResult } from '@/api/megaSena'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, SaveAll } from 'lucide-react'
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
  const content = (
    <>
      <LastResults loading={loading} draws={draws} onClick={openLast5} />

      <Button variant='outline' onClick={() => setModalOpen(true)}>
        <SaveAll />
        Jogos salvos
      </Button>
      <ThemeToggle />
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
