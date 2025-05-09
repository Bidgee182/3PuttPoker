import React, { useEffect } from 'react'
import { useGame } from '../context/GameContext'
import calculateScores from '../utils/calculateScores'
import confetti from 'canvas-confetti'

// 🎉 Fundraiser messages with {name} placeholder
const funMessages = [
  "{name} just paid for the next slab 🍻",
  "We’re gonna need a bigger bucket 🍺",
  "{name} is the real MVP — Most Valuable Punisher 💸",
  "Raise your glass to {name} 🥂",
  "Every OB supports the punt 🍀",
  "Golf + Beers = Fundraising done right 🍻",
  "{name} just helped us all drink better",
  "At this rate, we’ll need a second esky 🧊",
  "Cheers to {name}'s 3-putt 🍺",
  "Classic {name} — reliable fines funder 😂",
  "Shank it for charity! ⛳️",
  "Every shot counts — for the pot 😇",
  "{name}'s shot just earned the group a shout 👏",
  "Raise funds, raise eyebrows 😎",
  "Drinks on {name} tonight 🥃",
  "That shot better fund a slab 🍻",
  "Keep playing like that, we’ll be lit by hole 9 🔥",
  "Remember: it's not bad golf, it’s charity 😅",
  "{name} is single-handedly funding the fun",
  "All fines go to a noble cause: 🍺",
  "You just sponsored a round, {name} 🙌",
  "We’re not laughing at you, we’re drinking because of you 🍷",
  "Keep calm and pay your fine 😎",
  "Helping the group, one bad shot at a time",
  "{name} = Beer magnet 🍻",
  "Fines: because we love each other and beer 🍺",
  "{name}'s OB bought someone a drink",
  "More wipes = more beer 💥🍺",
  "Who needs skill when we have {name} 😄",
  "Making memories and money 💵",
  "{name} might be playing badly but fundraising great",
  "We call that a 'sponsor swing' 💸",
  "Golf gods smiled... on the pot 😇",
  "Mulligans accepted, fines expected",
  "Just a little club for big drinkers 🍺",
  "{name} just upgraded the beer budget",
  "This round’s on {name} — cheers! 🍻",
  "We're fine... with all the fines 😅",
  "Oops, all fines 💸",
  "Thanks for the contribution, {name} 😉",
  "If golfing were free, we’d still fine {name} 😂",
  "A bogey a day keeps sobriety away 🍷",
  "Beers before bogeys 🍻",
  "One swing for golf, one slab for mankind 🚀",
  "A great day for beer-fueled generosity",
  "That looked expensive, {name} 💸",
  "It’s called 'strategic fundraising' 🎯",
  "Some shots just scream 'beer me' 🍺",
  "More laughs, more fines, more fun 😄",
  "{name}'s drive went right... into the esky fund",
  "Play it where it lies. Fund it where it lands 💰",
  "Shot of the day, bill of the round 📜",
  "If you’re not fined, are you even playing?",
  "Add it to the tally, {name} 📈",
  "That’s a fundraiser’s swing if I’ve ever seen one",
  "You fine, we wine 🍷",
  "The course takes strokes, we take fines",
  "Next round paid by {name} 🙏",
  "We don't need sponsors. We have {name} 😅",
  "That miss funded a mission 🍻",
  "Swing hard, pay harder 💸",
  "Every divot is a donation 🙌",
  "Fundraiser of the Year: {name}",
  "Who knew {name}'s putts were so profitable?",
  "Cheers to bad swings and good causes 🥂",
  "Slabs for strokes 🏌️‍♂️🍺",
  "Mishits, misfires, and money 💰",
  "We’re not golfers. We’re beer philanthropists 🍻",
  "{name} might not win, but we do 🍺",
  "Bogeys = Beers",
  "Cashing in every bad lie 💸",
  "More strokes, more support 🫡",
  "{name} just unlocked sponsor status 🏆",
  "Those fines are looking good on us",
  "If it’s ugly but makes us money, we love it 😍",
  "Every shank counts 🤑",
  "{name} = Legend of the lager fund 🍺",
  "No skills, all thrills 🎢",
  "One man’s wipe is another man’s beer",
  "OB? More like 'Oh Bonus!' 💸",
  "Support your local esky 🧊",
  "Chipping in — literally and financially 💵",
  "A round of applause and drinks 🍹",
  "When in doubt, fine it out 🤷",
  "{name} keeping the dream alive 🍻",
  "Beer budget boosted ✅",
  "Best stroke of the day: the one that bought beers",
  "More penalty, more pilsner 🍺",
  "Your scorecard funds our fridge 🧊",
  "Keep hacking — we're hydrated",
  "Losing balls, winning hearts 💕",
  "Another wipe? Another round!",
  "{name}'s game = High score, higher bar tab",
  "Pot full, hearts fuller 🫶",
  "Give it up for our VIP sponsor — {name}!",
  "That's not a slice, that's a $5 donation",
  "When {name} plays, we all win 🍻",
  "Making it rain... beer 🧾🍺",
  "Bad shots, good people, full coolers",
  "Putt for pride, fine for beer"
]

export default function Leaderboard() {
  const {
    players,
    results,
    settings,
    holeSequence,
    setScreenStep
  } = useGame()

  // 🎯 Determine if round is complete
  const playedHoles = results.length
  const selectedGame = settings.gameType || ''
  const totalHolesToPlay = selectedGame.includes('18') ? 18 : 9
  const roundIsComplete = playedHoles >= totalHolesToPlay

  // 🧠 Random message with player name
  const randomPlayer = players[Math.floor(Math.random() * players.length)]?.name || "Someone"
  let selectedMessage = funMessages[Math.floor(Math.random() * funMessages.length)]
  if (selectedMessage.includes('{name}')) {
    selectedMessage = selectedMessage.replace('{name}', randomPlayer)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // ✅ Play confetti & sound only once per game
    if (roundIsComplete && !sessionStorage.getItem('celebrated')) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      })

      const audio = new Audio('/golf-clap.mp3')
      audio.volume = 0.5
      audio.play()

      sessionStorage.setItem('celebrated', 'yes')
    }
  }, [roundIsComplete])

  const totals = calculateScores(players, results, settings)
  const numPlayers = players.length
  const buyInTotal = numPlayers * (settings.buyIn || 0)

  let totalFines = 0
  let lastThreePutter = null

  results.forEach(hole => {
    hole.scores.forEach(score => {
      for (const key in settings.dollarValues) {
        if (score[key]) {
          totalFines += parseFloat(settings.dollarValues[key])
        }
      }
      if (score.threePutt) {
        lastThreePutter = score.name
      }
    })
  })

  if (lastThreePutter) {
    totalFines += 5
  }

  const totalPot = totalFines + buyInTotal

  return (
    <div className="w-full max-w-md bg-white p-6 shadow-2xl rounded-xl ring-2 ring-yellow-500 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-extrabold text-center text-green-700">🏆 Fines Leaderboard</h2>

      <div className="text-sm italic bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded shadow-md">
        💬 {selectedMessage}
      </div>

      <div className="bg-gray-100 text-black text-sm p-3 rounded">
        <p>💰 <strong>Total Pot:</strong> ${totalPot.toFixed(2)}</p>
        <p>🔢 Buy-Ins: ${buyInTotal.toFixed(2)} ({numPlayers} × ${settings.buyIn})</p>
        <p>💸 Fines Collected: ${totalFines.toFixed(2)}</p>
        {lastThreePutter && (
          <p>🚨 Last 3-putt fine: {lastThreePutter} owes extra $5</p>
        )}
        <p className="italic mt-2">No winner — this is all about raising funds and drinking beers. 🍻</p>
      </div>

      {totals.map((player, index) => (
        <div key={index} className="flex justify-between border-b py-2 font-semibold text-lg text-black">
          <span>{player.name}</span>
          <span>${player.total}</span>
        </div>
      ))}

      <hr className="border-t my-4" />

      <h3 className="text-xl font-bold text-green-800 text-center">📋 Hole Summary</h3>

      {results.map((hole, index) => (
        <div key={index} className="bg-gray-50 p-3 rounded border mb-2">
          <p className="font-bold text-black mb-1">Hole {hole.hole}</p>
          {hole.scores.map((score, i) => {
            const actions = Object.keys(settings.dollarValues)
              .filter(key => score[key])
              .map(key => formatLabel(key))

            return (
              <div key={i} className="text-sm text-black mb-2">
                • <strong>{score.name}</strong>: {actions.length ? actions.join(', ') : 'No Fines/Rewards 👍'}
              </div>
            )
          })}
        </div>
      ))}

      <button
        onClick={() => setScreenStep('game')}
        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 w-full mt-4 rounded-xl shadow transition"
      >
        ⬅️ Back to Scorecard
      </button>
    </div>
  )
}

function formatLabel(key) {
  const emojiMap = {
    onePutt: '⛳ One Putt',
    threePutt: '😩 Three Putt',
    nearestPin: '📍 Nearest Pin',
    sandSave: '🏖️ Sand Save',
    outOfBounds: '🚧 Out of Bounds',
    threePointer: '3️⃣ 3 Pointer',
    fourPointer: '4️⃣ 4 Pointer',
    wipe: '💥 Wipe'
  }
  return emojiMap[key] || key
}