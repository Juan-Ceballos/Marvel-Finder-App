import { useState } from 'react'
import './App.css'
import ProfileContainer from './components/MarvelCharacterProfile'
import marvelAPIService from "../src/services/marvel-api-service.js"

async function getCharacter() {
  try {
    const character = await marvelAPIService.fetchCharacter("wolverine")
    return character
  } catch (error) {
    console.error('Error in getCharacter', error)
    throw error
  }
}

function App() {
  const [count, setCount] = useState(0)
  getCharacter().then(character => {
    console.log(character)
  }).catch(error => {
    console.log(error)
  })
  return (
    <>
      <ProfileContainer />
    </>
  )
}

export default App
