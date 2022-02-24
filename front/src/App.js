import React, { useContext,useEffect } from 'react'
//context
import StoreProvider, { Store } from './context/AppContext'
//components
import { Form } from './components/Form'
import { Table } from './components/Table'


function App() {
  return (
    <StoreProvider>
      <h3>To-Do List</h3>
      <Form />
      <Table />
    </StoreProvider>
  )
}

export default App
