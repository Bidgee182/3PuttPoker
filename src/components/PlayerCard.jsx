import React from 'react'

export default function PlayerCard({ player, onUpdate }) {
  const toggle = (field, exclusiveFields = []) => {
    const newPlayer = { ...player }
    const currentlyOn = player[field]
    exclusiveFields.forEach(f => {
      newPlayer[f] = false
    })
    newPlayer[field] = !currentlyOn
    onUpdate(newPlayer)
  }

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow space-y-2 text-black">
      <h3 className="font-bold text-lg">{player.name}</h3>

      {/* One Putt / Three Putt - mutually exclusive */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggle('onePutt', ['threePutt'])}
          className={`px-3 py-2 rounded-lg shadow ${
            player.onePutt ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          ⛳ One Putt
        </button>
        <button
          onClick={() => toggle('threePutt', ['onePutt'])}
          className={`px-3 py-2 rounded-lg shadow ${
            player.threePutt ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          😩 Three Putt
        </button>
      </div>

      {/* Nearest, Sand Save, OB */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggle('nearestPin')}
          className={`px-3 py-2 rounded-lg shadow ${
            player.nearestPin ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          📍 Nearest Pin
        </button>
        <button
          onClick={() => toggle('sandSave')}
          className={`px-3 py-2 rounded-lg shadow ${
            player.sandSave ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          🏖️ Sand Save
        </button>
        <button
          onClick={() => toggle('outOfBounds')}
          className={`px-3 py-2 rounded-lg shadow ${
            player.outOfBounds ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          🚧 Out of Bounds
        </button>
      </div>

      {/* 3 Pointer / 4 Pointer / Wipe - mutual + exclusive */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggle('threePointer', ['fourPointer', 'wipe'])}
          disabled={player.wipe}
          className={`px-3 py-2 rounded-lg shadow ${
            player.wipe
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : player.threePointer
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          3️⃣ 3 Pointer
        </button>
        <button
          onClick={() => toggle('fourPointer', ['threePointer', 'wipe'])}
          disabled={player.wipe}
          className={`px-3 py-2 rounded-lg shadow ${
            player.wipe
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : player.fourPointer
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          4️⃣ 4 Pointer
        </button>
        <button
          onClick={() => toggle('wipe', ['threePointer', 'fourPointer'])}
          disabled={player.threePointer || player.fourPointer}
          className={`px-3 py-2 rounded-lg shadow ${
            player.threePointer || player.fourPointer
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : player.wipe
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          💥 Wipe
        </button>
      </div>
    </div>
  )
}
