const LATEST = 'https://loteriascaixa-api.herokuapp.com/api/megasena/latest'
const DRAW = 'https://loteriascaixa-api.herokuapp.com/api/megasena/'

export type MegaSenaResult = {
  concurso: number
  nomeLoteria: string
  data: string
  dezenas: number[] | string[]
  dataProximoConcurso?: string
  acumulou?: boolean
  valorEstimadoProximoConcurso: number
}

export async function getLatest(): Promise<MegaSenaResult> {
  const r = await fetch(LATEST)

  if (!r.ok) throw new Error('Falha ao buscar')

  return r.json()
}

export async function getByDraw(draw: number): Promise<MegaSenaResult> {
  const r = await fetch(`${DRAW}${draw}`)
  if (!r.ok) throw new Error('Falha ao buscar concurso')
  return r.json()
}

export async function getLast(count = 5): Promise<MegaSenaResult[]> {
  const latest = await getLatest()

  const list = [latest]

  for (let i = 1; i < count; i++) {
    list.push(await getByDraw(latest.concurso - i))
  }
  
  return list.sort((a, b) => b.concurso - a.concurso)
}
