import { useState, useContext } from "react"
//context -store
import { Store } from '../context/AppContext'
//actions
import { addList, setError } from '../actions'
//components
import { List } from './List'
import { Form } from "./Form"
//custom hooks
import { useCrud } from '../hooks/useCrud'
//styles
import style from '../styles/components/Dashboard.module.css'


export const Dashboard = () => {
    const { state: { lists, error, loading: loadGlobal }, dispatch } = useContext(Store)
    const [ loading, setLoading ] = useState(false)
    const [ newList, setNewList] = useState("")
    const [ alert, setAlert ] = useState(null)
    const { post } = useCrud()


    const addNewList = () => {

        if(!newList.trim()) {
            setAlert("Ingresa una lista, por favor!")
          return false
        }

        if(newList.length > 24) {
            setAlert("Lista no valida, intenta otra vez")
            return false
        }

        setLoading(true)

        post({query: "lists", payload: { name: newList}},(err,data) => {
            dispatch(addList({
                ...data,
                todos: []
            }))
            dispatch(setError(err))
            setLoading(false)
        })

        setNewList("")
        setAlert(null)
    }

   const handleViewError = () => {
        if(error) return <h2>{error}</h2>
   }

    return(
        <main className={ style.Dashboard }>
            <h1 className={style.Dashboard_Title }>Lista de Todos</h1>

            <section className={style.Form_Wrapper }>
                <Form
                    valueTitle={ loading ? "Loading" : "Crear"}
                    placeholder="Ingresa una lista"
                    value={newList}
                    setValue={setNewList}
                    cb={addNewList}
                />
            </section>

            <span className={style.Alert }>{alert && alert }</span>

            <section className={ style.Dashboard_Lists}>
                { handleViewError() }
                { loadGlobal && <h2>Loading...</h2>}
                {
                    (!loadGlobal && lists.length > 0)
                    &&
                        lists.map(l => (
                            <List
                                key={l.id}
                                listId={l.id}
                                todos={ l.todos}
                                name={l.name}
                            />
                    ))
                }
                {
                    (!loadGlobal && !lists.length)
                    &&
                        <h2
                            className={ style.NotContent }>
                            No hay ninguna lista, crea una!
                        </h2>
                }
            </section>
        </main>
    )
}
