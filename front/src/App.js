import React from 'react'
//context
import StoreProvider from './context/AppContext'
//components
import { Dashboard } from './components/Dashboard'



function App() {
  return (
    <StoreProvider>
        <main>
          <header>SofkaU Reto1</header>

          <Dashboard />

        </main>
    </StoreProvider>
  )
}

export default App
