import React from 'react'
import { GameProvider, useGame } from './context/GameContext'
import StartScreen from './components/StartScreen'
import ScoringRules from './components/ScoringRules'
import HoleEntry from './components/HoleEntry'
import Leaderboard from './components/Leaderboard'

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-green-700 text-white flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold text-center mb-4">3-Putt Poker</h1>
        <GameContent />
      </div>
    </GameProvider>
  )
}

function GameContent() {
  const { screenStep, currentHoleIndex, holeSequence } = useGame()

  if (screenStep === 'players') return <StartScreen />
  if (screenStep === 'rules') return <ScoringRules />
  if (screenStep === 'leaderboard') return <Leaderboard />
  if (screenStep === 'game' && currentHoleIndex >= holeSequence.length) return <Leaderboard />
  if (screenStep === 'game') return <HoleEntry />

  return <p className="text-red-500">Error: Invalid screen step</p>
}
