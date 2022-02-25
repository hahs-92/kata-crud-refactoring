import { useState, useContext } from "react"
//context -store
import { Store } from '../context/AppContext'
//actions
import { addList, setError } from '../actions'
//components
import { List } from './List'
import { Form } from "./Form"
//styles
import style from '../styles/components/Dashboard.module.css'

//url-api
const HOST_API = "http://192.168.0.105:8081/api"


export const Dashboard = () => {
    const { state: { lists, error }, dispatch } = useContext(Store)
    const [ loading, setLoading ] = useState(false)
    const [ newList, setNewList] = useState("")


    const addNewList = async() => {
        if(!newList.trim()) return false

        setLoading(true)
        try {
            const resp = await fetch(`${HOST_API}/lists`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newList}),
            })

            const listcreated = await resp.json()

            if(resp.status === 201) {
                dispatch(addList({
                    ...listcreated,
                    todos: []
                }))
                setLoading(false)
            }


            setNewList("")
        } catch(e) {
            setLoading(false)
            dispatch(setError("SomeThing went wrong"))
        }
    }


    return(
        <main className={ style.Dashboard }>
            <h1 className={style.Dashboard_Title }>Lista de Todos</h1>
            <hr className={ style.Dashboard_Hr} />

            <Form
                valueTitle={ loading ? "Loading" : "Crear"}
                placeholder="Ingresa una lista"
                value={newList}
                setValue={setNewList}
                cb={addNewList}
            />

            <section>
                { error && <h2>{error}</h2>}
                {
                    (!error  && lists.length)
                    ?
                        lists.map(l => (
                            <List
                                key={l.id}
                                listId={l.id}
                                todos={ l.todos}
                                name={l.name}
                            />
                        ))
                    :  <h2>No hay ninguna lista, crea una!</h2>
                }
            </section>
        </main>
    )
}
