import { useState } from 'react'
import './App.css'
import ProfileContainer from './components/MarvelCharacterProfile'
import marvelAPIService from "../src/services/marvel-api-service.js"

function getCharacter() {
  let response = marvelAPIService.fetchCharacter("wolverine")
  return response
}

function App() {
  const [count, setCount] = useState(0)
  getCharacter()
  return (
    <>
      <ProfileContainer />
    </>
  )
}

export default App
