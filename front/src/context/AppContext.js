import { createContext, useReducer, useEffect } from 'react'
//reducer
import reducer from '../reducer'
//acyions
import {setInitialState, setError, setLoading} from '../actions'

//api-url
const HOST_API = "http://192.168.0.105:8081/api"

const initialState = {
    lists: [],
    error: null,
    loading: false
}


export const Store = createContext(initialState)


const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const getList = async() => {
        dispatch(setLoading(true))
        try {
            const resp = await fetch(`${HOST_API}/lists`)
            const listResp = await resp.json()

            dispatch(setInitialState(listResp))
            dispatch(setLoading(false))

        }catch(e) {
            dispatch(setLoading(false))
            dispatch(setError("Someting went wrong!, Try again later"))
        }
    }

    useEffect(() => {
        getList()
    },[])

    return (
        <Store.Provider value={{ state, dispatch }}>
            { children }
        </Store.Provider>
    )
}

export default StoreProvider
