import { useState } from 'react'
import './App.css'
import ProfileContainer from './components/MarvelCharacterProfile'
import marvelAPIService from "../src/services/marvel-api-service.js"

const mockCharacters = [{id: "01", name: "wolverine", description:"XMen", imgURL: "src/assets/wolverine.jpg"}, 
  {id: "02", name: "groot", description: "Guardians", imgURL: "src/assets/groot.webp"},
  {id: "03", name: "deadpool", description: "Rogue", imgURL: "src/assets/deadpool.jpg"}]

function App() {
  const [count, setCount] = useState(0)
  let marvelChar1 = mockCharacters[0]
  let marvelChar2 = mockCharacters[1]
  let marvelChar3 = mockCharacters[2]
 
  return (
    <>
      <ProfileContainer imgURL={marvelChar1.imgURL} name={marvelChar1.name}/>
      <ProfileContainer imgURL={marvelChar2.imgURL} name={marvelChar2.name}/>
      <ProfileContainer imgURL={marvelChar3.imgURL} name={marvelChar3.name}/>
    </>
  )
}

export default App
