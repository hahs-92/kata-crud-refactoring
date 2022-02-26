import { createContext, useReducer, useEffect } from 'react'
//reducer
import reducer from '../reducer'
//acyions
import {setInitialState, setError, setLoading} from '../actions'
//custom hooks
import { useCrud } from '../hooks/useCrud'


const initialState = {
    lists: [],
    error: null,
    loading: false
}


export const Store = createContext(initialState)


const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {get} = useCrud()

    const handleFetch = (err, data) => {
        dispatch(setInitialState(data))
        dispatch(setLoading(false))
        dispatch(setError(err))
    }


    useEffect(() => {
        dispatch(setLoading(true))
        get({method: "GET", query: "lists"},handleFetch)
    },[])


    return (
        <Store.Provider value={{ state, dispatch }}>
            { children }
        </Store.Provider>
    )
}

export default StoreProvider
