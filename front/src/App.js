import React from 'react'
//context
import StoreProvider from './context/AppContext'
//components
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
//styles
import style from './styles/App.module.css'



function App() {
  return (
    <div className={ style.App }>
      <Header />
      <main>
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    </main>
    </div>

  )
}

export default App
