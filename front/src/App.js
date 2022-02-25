import React from 'react'
//context
import StoreProvider from './context/AppContext'
//components
import { Dashboard } from './components/Dashboard'



function App() {
  return (
      <main>
        <header>SofkaU Reto1</header>

        <StoreProvider>
          <Dashboard />
        </StoreProvider>
      </main>
  )
}

export default App
