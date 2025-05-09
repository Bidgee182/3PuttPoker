import React, { useState } from 'react'
import { useGame } from '../context/GameContext'

export default function StartScreen() {
  const {
    setSettings,
    setPlayers,
    setHoleSequence,
    setCurrentHoleIndex,
    setScreenStep
  } = useGame()

  const [names, setNames] = useState(['', '', '', ''])
  const [selected, setSelected] = useState('18-1')
  const [error, setError] = useState(false)

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

  const handleNext = () => {
    const playerNames = names.filter(name => name.trim() !== '')
    if (playerNames.length === 0) {
      setError(true)
      return
    }

    const [total, start] = selected.split('-')
    const totalHoles = parseInt(total)
    const startHole = parseInt(start)

    const holeOrder = generateHoleSequence(startHole, totalHoles)

    // Set all state directly
    setSettings(prev => ({
      ...prev,
      totalHoles,
      startHole
    }))
    setPlayers(playerNames.map(name => ({ name, scores: [] })))
    setHoleSequence(holeOrder)
    setCurrentHoleIndex(0)
    setScreenStep('rules')
  }

  const isFormValid = names.some(name => name.trim() !== '')

  return (
    <div className="w-full max-w-sm md:max-w-md bg-white p-4 shadow-xl rounded-xl ring-2 ring-green-700 space-y-4">
      <h2 className="text-xl font-bold text-black">Enter Player Names</h2>

      {names.map((name, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Player ${index + 1}`}
          value={name}
          onChange={(e) => {
            const updated = [...names]
            updated[index] = e.target.value
            setNames(updated)
            setError(false)
          }}
          className="border p-2 w-full mb-2"
        />
      ))}

      {error && (
        <p className="text-red-600 text-sm font-semibold text-center">
          ⚠️ Please enter at least one player name.
        </p>
      )}

      <h3 className="font-semibold text-black">Select Game Mode</h3>
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="border p-2 w-full">
        <option value="18-1">18 Holes (start at Hole 1)</option>
        <option value="18-10">18 Holes (start at Hole 10)</option>
        <option value="9-1">9 Holes (start at Hole 1)</option>
        <option value="9-10">9 Holes (start at Hole 10)</option>
      </select>

      <button
        onClick={handleNext}
        disabled={!isFormValid}
        className={`px-4 py-3 text-sm sm:text-base mt-4 w-full rounded-xl shadow-xl transition-all duration-200 ${
          isFormValid
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        ➡️ Next: Set Scoring
      </button>
    </div>
  )
}
