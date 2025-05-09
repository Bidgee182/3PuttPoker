import React from 'react'
import { useGame } from '../context/GameContext'

export default function ScoringRules() {
  const { settings, setSettings, setScreenStep } = useGame()

  const scoringOptions = [
    { key: 'onePutt', label: '⛳ One Putt' },
    { key: 'threePutt', label: '😩 Three Putt' },
    { key: 'nearestPin', label: '📍 Nearest Pin' },
    { key: 'sandSave', label: '🏖️ Sand Save' },
    { key: 'outOfBounds', label: '🚧 Out of Bounds' },
    { key: 'threePointer', label: '3️⃣ 3 Pointer' },
    { key: 'fourPointer', label: '4️⃣ 4 Pointer' },
    { key: 'wipe', label: '💥 Wipe' },
  ]

  const updateValue = (key, value) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setSettings(prev => ({
        ...prev,
        dollarValues: {
          ...prev.dollarValues,
          [key]: num
        }
      }))
    }
  }

  const updateBuyIn = (value) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setSettings(prev => ({
        ...prev,
        buyIn: num
      }))
    }
  }

  return (
    <div className="w-full max-w-sm md:max-w-md bg-white p-4 shadow-xl rounded-xl ring-2 ring-green-700 space-y-6">
      <h2 className="text-xl font-bold text-center text-black">💰 Set Dollar Values</h2>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-black">💸 Player Buy-In</label>
        <div className="flex items-center gap-1">
          <span className="text-black">$</span>
          <input
            type="number"
            step="1"
            value={settings.buyIn ?? ''}
            onChange={(e) => updateBuyIn(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {scoringOptions.map(({ key, label }) => (
          <div key={key} className="flex flex-col text-black">
            <label className="text-sm">{label}</label>
            <div className="flex items-center gap-1">
              <span>$</span>
              <input
                type="number"
                step="0.5"
                value={settings.dollarValues[key] ?? ''}
                onChange={(e) => updateValue(key, e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setScreenStep('players')}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 w-full rounded-xl shadow transition-all"
        >
          ⬅️ Back to Player Names
        </button>

        <button
          onClick={() => setScreenStep('game')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 text-sm sm:text-base w-full rounded-xl shadow-xl transition-all duration-200"
        >
          ✅ Start Game
        </button>
      </div>
    </div>
  )
}
