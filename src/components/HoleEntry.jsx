import React, { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import PlayerCard from './PlayerCard'

export default function HoleEntry() {
  const {
    players,
    results,
    holeSequence,
    currentHoleIndex,
    setCurrentHoleIndex,
    setResults,
    setScreenStep
  } = useGame()

  const currentHole = holeSequence[currentHoleIndex] || null
  const [scores, setScores] = useState([])

  // ✅ Load scores for this hole or reset if not scored yet
  useEffect(() => {
    const existing = results.find(r => r.hole === currentHole)

    if (existing) {
      setScores(existing.scores)
    } else {
      setScores(players.map(player => ({
        name: player.name,
        onePutt: false,
        threePutt: false,
        nearestPin: false,
        sandSave: false,
        outOfBounds: false,
        threePointer: false,
        fourPointer: false,
        wipe: false,
      })))
    }
  }, [currentHole, results, players])

  const updatePlayer = (index, updatedData) => {
    const updated = [...scores]
    updated[index] = updatedData
    setScores(updated)
  }

  // ✅ Updated Save button logic
  const handleSubmit = () => {
    const updatedResults = [...results]
    const existingIndex = updatedResults.findIndex(r => r.hole === currentHole)

    if (existingIndex !== -1) {
      updatedResults[existingIndex] = { hole: currentHole, scores }
    } else {
      updatedResults.push({ hole: currentHole, scores })
    }

    setResults(updatedResults)

    const totalHoles = holeSequence.length
    const isLastHole = currentHoleIndex === totalHoles - 1

    if (isLastHole) {
      sessionStorage.removeItem('celebrated') // 🎉 enable confetti
      setScreenStep('leaderboard')            // ✅ jump to leaderboard
    } else {
      setCurrentHoleIndex(currentHoleIndex + 1) // ➡️ go to next hole
    }
  }

  return (
    <div className="w-full max-w-sm md:max-w-md bg-white p-4 shadow-xl rounded-xl ring-2 ring-green-700 space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold mb-2 text-center text-black">Hole {currentHole}</h2>

      {currentHoleIndex === 0 && (
        <button
          onClick={() => setScreenStep('rules')}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 w-full rounded-xl shadow transition-all"
        >
          ⬅️ Back to Scoring Rules
        </button>
      )}

      {scores.map((player, index) => (
        <PlayerCard key={index} player={player} onUpdate={(data) => updatePlayer(index, data)} />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm sm:text-base w-full rounded-xl shadow-xl transition-all duration-200"
      >
        💾 Save Hole {currentHole}
      </button>

      <button
        onClick={() => setScreenStep('leaderboard')}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 mt-2 w-full rounded-xl shadow transition-all"
      >
        👀 View Live Leaderboard
      </button>

      <div className="flex justify-between mt-4 space-x-2">
        <button
          disabled={currentHoleIndex === 0}
          onClick={() => setCurrentHoleIndex(currentHoleIndex - 1)}
          className={`w-1/2 px-3 py-2 rounded-xl shadow ${
            currentHoleIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-black'
          }`}
        >
          ⬅️ Back
        </button>

        <button
          disabled={currentHoleIndex >= holeSequence.length - 1}
          onClick={() => setCurrentHoleIndex(currentHoleIndex + 1)}
          className={`w-1/2 px-3 py-2 rounded-xl shadow ${
            currentHoleIndex >= holeSequence.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-black'
          }`}
        >
          ➡️ Next
        </button>
      </div>
    </div>
  )
}
