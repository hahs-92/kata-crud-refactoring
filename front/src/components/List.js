import { useState, useContext } from 'react'
//context -store
import {  Store } from '../context/AppContext'
//actions
import { deleteList, addTodo } from '../actions'
//components
import { Table } from './Table'
import { Form } from './Form'
//url-api
const HOST_API = "http://localhost:8080/api"


export const List = ({listId, name, todos}) => {
    const { dispatch } = useContext(Store)
    const [ editing, setEditing ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ item, setItem ] = useState("")
    const [ itemUpdate, setItemUpdate] = useState({id: null, name:"", completed:false, listId: listId})

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
        setLoading(true)
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
               dispatch(addTodo(todoCreated))
               setLoading(false)
            }

            setItem("")

        } catch(e) {
            setLoading(false)
        }
    }



    const editTodo = async()  => {
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
                }),
            })

            if(resp.status ===  200) {
                dispatch(editTodo({
                    listId: listId,
                    todo: itemUpdate
                }))
                setLoading(false)
            }

            setEditing(false)
            setItem("")
            setItemUpdate({id: null, name: "", completed: false, listId: listId})

        } catch(e) {
            setLoading(false)
            console.error(e)
        }
    }


    return(
        <article>
            <section>
                <h2>{name}</h2>
                <img src="" alt="remove-icon" onClick={onDeleteList}/>
            </section>

            <section>
                <Form
                    valueTitle={ loading ? "Loading..." :  editing ? "Editar" : "Crear" }
                    placeholder="Ingresa un todo"
                    value={ item }
                    setValue={ setItem }
                    cb={editing ? editTodo : addNewTodo}
                />
            </section>

            <section>
                <Table
                    todos={ todos }
                    listId={listId}
                    setEditing={ setEditing }
                    setItemUpdate={ setItemUpdate }
                    setItem={ setItem }
                />
            </section>

        </article>
    )
}
