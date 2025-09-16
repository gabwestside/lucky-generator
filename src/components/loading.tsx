export function CloverSix({ label }: { label?: string }) {
  return (
    <div className='flex flex-col items-center gap-2 py-2'>
      <div className='clover-row'>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className='text-2xl animate-clover-blink'
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            🍀
          </span>
        ))}
      </div>
      {label && <p className='text-sm opacity-70'>{label}</p>}
    </div>
  )
}

export function CloverFullScreen() {
  return (
    <div className='min-h-screen grid place-items-center'>
      <div className='flex flex-col items-center'>
        <span className='clover clover-big animate-clover-bounce'>🍀</span>
        <p className='mt-2 opacity-70'>Carregando sorte da Mega-Sena...</p>
      </div>
    </div>
  )
}
