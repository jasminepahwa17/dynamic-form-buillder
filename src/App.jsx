import { useState } from 'react'
import DynamicForm from './components/DynamicForm'


function App() {

  return (
    <div className="App bg-neutral-100 overflow-y-auto lg:py-12 p-2 text-black w-screen h-full flex items-center justify-center">
      <DynamicForm />
      </div>
  )
}

export default App
