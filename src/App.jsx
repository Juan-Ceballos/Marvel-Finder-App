import { useState } from 'react'
import './App.css'
import ProfileContainer from './Components/MarvelCharacterProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProfileContainer />
    </>
  )
}

export default App
