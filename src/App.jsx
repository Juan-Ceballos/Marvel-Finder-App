import { useState } from 'react'
import './App.css'
import ProfileContainer from './components/MarvelCharacterProfile'
import marvelAPIService from "../src/services/marvel-api-service.js"

const mockCharacters = [{id: "01", name: "wolverine", description:"XMen", imgURL: "src/assets/wolverine.jpg"}, 
  {id: "02", name: "groot", description: "Guardians", imgURL: "../assets/groot.webp"},
  {id: "03", name: "deadpool", description: "Rogue", imgURL: "../assets/deadpool.jpg"}]

function App() {
  const [count, setCount] = useState(0)
  let marvelChar = mockCharacters[0]
 
  return (
    <>
      <ProfileContainer imgURL={marvelChar.imgURL} name={marvelChar.name}/>
    </>
  )
}

export default App
