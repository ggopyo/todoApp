import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Tasks } from './components/Tasks'

const App = () => {
  return (
    <div className='App'>
      <DndProvider backend={HTML5Backend}>
        <Tasks />
      </DndProvider>
    </div>
  )
}

export default App
