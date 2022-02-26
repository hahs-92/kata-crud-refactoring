import { useState, useContext } from 'react'
//context -store
import {  Store } from '../context/AppContext'
//actions
import { deleteList, addTodo, editTodo, setError } from '../actions'
//components
import { Table } from './Table'
import { Form } from './Form'
//custom-hooks
import { useCrud } from '../hooks/useCrud'
//styles
import style from '../styles/components/List.module.css'
//assets
import removeIcon from '../assets/remove.png'



export const List = ({listId, name, todos}) => {
    const { dispatch } = useContext(Store)
    const [ editing, setEditing ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ item, setItem ] = useState("")
    const [ itemUpdate, setItemUpdate] = useState({id: null, name:"", completed:false, listId: listId})
    const [ alert, setAlert ] = useState(null)
    const { remove, post, udpate } = useCrud()

    const onDeleteList = () => {
        remove({query:"lists", param:listId},(err, data) => {
            dispatch(deleteList(listId))
        })
    }

    const addNewTodo = () => {
        if(!item.trim()) {
            setAlert("Ingresa un todo, por favor")
            return false
        }

        if(item.length > 24) {
            setAlert("Todo no valido!")
            return false
        }

        setLoading(true)
        post({ query:"todos",payload:{name: item,listId} }, (err, data) => {
            dispatch(addTodo({ listId: listId, todo: data}))
            setLoading(false)
            setError(err)
        })

        setItem("")
        setAlert(null)
    }



    const onEditTodo = ()  => {
        if(!item.trim()) {
            setAlert("Ingresa un todo, por favor")
            return false
        }

        if(item.length > 24) {
            setAlert("Todo no valido!")
            return false
        }

        setLoading(true)

        udpate({query: "todos", payload: {...itemUpdate,name: item}}, (err, data) => {
            dispatch(editTodo({
                listId: listId,
                todo: data
            }))

            setLoading(false)
            setError(err)
        })

        setEditing(false)
        setItem("")
        setItemUpdate({id: null, name: "", completed: false, listId: listId})
        setAlert(null)
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
