export default function calculateScores(players, results, settings) {
  const dollarValues = settings?.dollarValues || {}

  // Create a map of player names → total fine
  const playerTotals = players.map(player => ({
    name: player.name,
    total: 0
  }))

  results.forEach(hole => {
    hole.scores.forEach(score => {
      const player = playerTotals.find(p => p.name === score.name)
      if (!player) return

      for (const action in dollarValues) {
        if (score[action]) {
          const fine = parseFloat(dollarValues[action]) || 0
          player.total += fine
        }
      }
    })
  })

  // Add buy-in if needed
  if (settings.buyIn) {
    playerTotals.forEach(player => {
      player.total += parseFloat(settings.buyIn)
    })
  }

  return playerTotals
}
