import { useState } from 'react'
import './App.css'
import ProfileContainer from './components/MarvelCharacterProfile'
import marvelAPIService from "../src/services/marvel-api-service.js"
import CharacterGrid from './components/CharacterGrid.jsx'

const mockCharacters = [{id: "01", name: "wolverine", description:"XMen", imgURL: "src/assets/wolverine.jpg"}, 
  {id: "02", name: "groot", description: "Guardians", imgURL: "src/assets/groot.webp"},
  {id: "03", name: "deadpool", description: "Rogue", imgURL: "src/assets/deadpool.jpg"}]

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <CharacterGrid characters={mockCharacters}/>
    </>
  )
}

export default App
