import { createContext } from 'react'
//reducer
import reducer from '../reducer'

const initialState = {

    todo: { list: [], item: {} }
}

export const store = createContext(initialState)


export const storeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <store.Provider value={{ state, dispatch }}>
            { children }
        </store.Provider>
    )

}