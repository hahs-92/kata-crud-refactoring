import { useState, useContext } from "react"
//context -store
import { Store } from '../context/AppContext'
//actions
import { addList,setLoading, setError } from '../actions'
//components
import { List } from './List'
import { Form } from "./Form"

//url-api
const HOST_API = "http://192.168.0.105:8081/api"

const data = [
    {
        id: 1,
        name: "list test",
        todos: [
            {
                id: 10,
                name: "todo test",
                completed: false
            },
            {
                id: 50,
                name: "todo test 2",
                completed: true
            }
        ]
    },
    {
        id: 2,
        name: "list test",
        todos: [
            {
                id: 10,
                name: "todo test",
                completed: false
            }
        ]
    },
    {
        id: 5,
        name: "list trty",
        todos: []
    }
]


export const Dashboard = () => {
    const { state: { lists, error, loading }, dispatch } = useContext(Store)
    const [ newList, setNewList] = useState("")


    const addNewList = async() => {
        dispatch(setLoading(true))
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
                dispatch(addList(listcreated))
                dispatch(setLoading(false))
            }


            setNewList("")
        } catch(e) {
            dispatch(setLoading(false))
            dispatch(setError("SomeThing went wrong"))
        }
    }


    return(
        <section>
            <section>
                <Form
                    valueTitle={ loading ? "Loading" : "Crear"}
                    placeholder="Ingresa una lista"
                    value={newList}
                    setValue={setNewList}
                    cb={addNewList}
                />
            </section>

            <section>
                { error && <h2>{error}</h2>}
                { loading && <h2>Loading...</h2>}
                {
                    (!error && !loading && lists.length)
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
        </section>
    )
}
