import React from 'react'

export default function PlayerCard({ player, onUpdate }) {
  const handleToggle = (field) => {
    const newPlayer = {
      ...player,
      [field]: !player[field],
    }

    // 🔁 Mutually exclusive logic for 3/4 pointer
    if (field === 'threePointer' && !player.threePointer) {
      newPlayer.fourPointer = false
    }

    if (field === 'fourPointer' && !player.fourPointer) {
      newPlayer.threePointer = false
    }

    onUpdate(newPlayer)
  }

  const scoreOptions = [
    { key: 'onePutt', label: '⛳ One Putt' },
    { key: 'threePutt', label: '😩 Three Putt' },
    { key: 'threePointer', label: '3️⃣ 3 Pointer' },
    { key: 'fourPointer', label: '4️⃣ 4 Pointer' },
    { key: 'nearestPin', label: '📍 Nearest Pin' },
    { key: 'sandSave', label: '🏖️ Sand Save' },
    { key: 'outOfBounds', label: '🚧 Out of Bounds' },
    { key: 'wipe', label: '💥 Wipe' },
  ]

  return (
    <div className="bg-gray-100 p-3 rounded-xl shadow text-black space-y-2">
      <h3 className="font-bold text-lg">{player.name}</h3>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {scoreOptions.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleToggle(key)}
            className={`w-full px-3 py-2 rounded-full font-medium border text-sm transition ${
              player[key]
                ? 'bg-green-600 text-white border-green-700'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
