import React from 'react'
import { Ability } from '@casl/ability'
import TablePage from '../../pages/Table'
import { AbilityContext } from '../Abilities'
import '../../assets/css/App.css'

const ability = new Ability()

const App = () => {
  return (
    <AbilityContext.Provider value={ability}>
      <div className="App">
        <TablePage ability={ability} />
      </div >
    </AbilityContext.Provider>
  )
}

export default App
