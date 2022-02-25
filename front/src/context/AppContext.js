import { createContext, useReducer } from 'react'
//reducer
import reducer from '../reducer'

const initialState = {
    lists: []
}

export const Store = createContext(initialState)


const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={{ state, dispatch }}>
            { children }
        </Store.Provider>
    )
}

export default StoreProvider
