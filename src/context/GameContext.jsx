import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()
export const useGame = () => useContext(GameContext)

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([])
  const [settings, setSettings] = useState({
    startHole: 1,
    totalHoles: 18,
    buyIn: 5,
    dollarValues: {
      onePutt: -1,
      threePutt: 3,
      nearestPin: -2,
      sandSave: -1,
      outOfBounds: 3,
      threePointer: -1,
      fourPointer: -3,
      wipe: 3,
    },
  })
  const [results, setResults] = useState([])
  const [screenStep, setScreenStep] = useState('players')
  const [holeSequence, setHoleSequence] = useState([])
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0)

  const generateHoleSequence = (start, total) => {
    const holes = []
    if (total === 18 && start === 1) {
      for (let i = 1; i <= 18; i++) holes.push(i)
    } else if (total === 18 && start === 10) {
      for (let i = 10; i <= 18; i++) holes.push(i)
      for (let i = 1; i <= 9; i++) holes.push(i)
    } else if (total === 9 && start === 1) {
      for (let i = 1; i <= 9; i++) holes.push(i)
    } else if (total === 9 && start === 10) {
      for (let i = 10; i <= 18; i++) holes.push(i)
    }
    return holes
  }

  const addPlayers = (playerNames) => {
    const newPlayers = playerNames.map(name => ({ name, scores: [] }))
    const holes = generateHoleSequence(settings.startHole, settings.totalHoles)
    setPlayers(newPlayers)
    setHoleSequence(holes)
    setCurrentHoleIndex(0)
    setScreenStep('rules')
  }

  const nextHole = (holeData) => {
    setResults([...results, holeData])
    setCurrentHoleIndex(currentHoleIndex + 1)
  }

  return (
    <GameContext.Provider value={{
  players, setPlayers,
  settings, setSettings,
  results, setResults,
  screenStep, setScreenStep,
  holeSequence, setHoleSequence,
  currentHoleIndex, setCurrentHoleIndex,
  nextHole
    }}>
      {children}
    </GameContext.Provider>
  )
}