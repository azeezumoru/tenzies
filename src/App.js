import React from 'react'
import Die from './components/Die'
import './App.css';
import {nanoid} from 'nanoid'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [dice, setDice] = React.useState(allNewDice())

  // eslint-disable-next-line no-unused-vars
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('you won')
    }
  }, [dice])

  function generateNewDie() {
    return{
      value: Math.ceil(Math.random() * 6),
      isHeld: false, id: nanoid()
    }
  }

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
        diceArray.push(generateNewDie());
    }
    return diceArray;
}

function rollDice() {
  setDice(oldDice => oldDice.map(die => {
    return die.isHeld ? die : generateNewDie()
  }))
}

function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} :
    die
  }))
}

// Example usage:
console.log(allNewDice());

  const diceElements = dice.map(die => <Die key={die.id} 
    value={die.value} isHeld={die.isHeld} id={die.id}
    holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {/* {Render Confetti component if `tenzies` is true} */}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. 
        Click each die to drive to freeze it at its current value between rolls</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? 'New Game': 'Roll'}</button>
    </main>
  );
}

export default App;
