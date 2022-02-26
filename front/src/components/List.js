import { useState, useContext } from 'react'
//context -store
import {  Store } from '../context/AppContext'
//actions
import { deleteList, addTodo, editTodo, setError } from '../actions'
//components
import { Table } from './Table'
import { Form } from './Form'
//styles
import style from '../styles/components/List.module.css'
//assets
import removeIcon from '../assets/remove.png'
//url-api
const HOST_API = "http://192.168.0.105:8081/api"



export const List = ({listId, name, todos}) => {
    const { dispatch } = useContext(Store)
    const [ editing, setEditing ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ item, setItem ] = useState("")
    const [ itemUpdate, setItemUpdate] = useState({id: null, name:"", completed:false, listId: listId})
    const [ alert, setAlert ] = useState(null)

    const onDeleteList = async() => {
        try {
            const resp = await fetch(`${HOST_API}/lists/${listId}`, {
                method: "DELETE"
            })

            if(resp.status === 204) {
                dispatch(deleteList(listId))
            }
        } catch(e) {
            console.log(e)
        }
    }

    const addNewTodo = async () => {
        if(!item.trim()) {
            setAlert("Ingresa un todo, por favor")
            return false
        }

        if(item.length > 24) {
            setAlert("Todo no valido!")
            return false
        }

        setLoading(true)
        console.log("todo to create: ", item)
        try {
            const resp = await fetch(`${HOST_API}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {name: item,listId}
                ),
            })

            const todoCreated = await resp.json()

            if(resp.status === 201) {
               dispatch(addTodo({ listId: listId, todo: todoCreated}))
               setLoading(false)
            }

            setItem("")
            setAlert(null)
            setError(null)

        } catch(e) {
            setLoading(false)
            setError("Something went wrong!")
        }
    }



    const onEditTodo = async()  => {
        if(!item.trim()) {
            setAlert("Ingresa un todo, por favor")
            return false
        }

        if(item.length > 24) {
            setAlert("Todo no valido!")
            return false
        }

        setLoading(true)

        try {
            const resp =  await fetch(`${HOST_API}/todos`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...itemUpdate,
                    name: item
                })
            })

            if(resp.status ===  200) {
                dispatch(editTodo({
                    listId: listId,
                    todo: { ...itemUpdate, name: item}
                }))
                setLoading(false)
            }

            setEditing(false)
            setItem("")
            setItemUpdate({id: null, name: "", completed: false, listId: listId})
            setError(null)
            setAlert(null)

        } catch(e) {
            setLoading(false)
            setError("Something went wrong!")
        }
    }


    return(
        <article className={ style.List } >
            <header  className={ style.List_Header }>
                <h2>{name}</h2>
                <img src={removeIcon} alt="remove-icon" onClick={onDeleteList}/>
            </header>

            <Form
                valueTitle={ loading ? "Loading..." :  editing ? "Editar" : "Crear" }
                placeholder="Ingresa un todo"
                value={ item }
                setValue={ setItem }
                cb={editing ? onEditTodo : addNewTodo}
            />

            <span className={ style.List_Alarm }>{ alert && alert }</span>

            <>
                {
                    todos
                        && <Table
                            todos={ todos }
                            listId={listId}
                            setEditing={ setEditing }
                            setItemUpdate={ setItemUpdate }
                            setItem={ setItem }
                        />
                }

            </>

        </article>
    )
}
