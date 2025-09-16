import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode')
    const isDark = saved ? JSON.parse(saved) : false

    setDark(isDark)

    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggle() {
    const next = !dark

    setDark(next)

    localStorage.setItem('dark-mode', JSON.stringify(next))

    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <Button variant='outline' onClick={toggle} className='gap-2'>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      {dark ? 'Claro' : 'Escuro'}
    </Button>
  )
}
