import {  useContext } from 'react'
//context-stroe
import {  Store } from '../context/AppContext'
//actions
import { deleteTodo, editTodo } from '../actions'
//components
import { Row } from "./Row"
//styles
import style from '../styles/components/Table.module.css'

//api-url
const HOST_API = "http://192.168.0.105:8081/api"

export const Table = ({todos, listId, setEditing, setItemUpdate, setItem}) => {
    const { dispatch } = useContext(Store)

    const onDeleteTodo = async(todoId) => {
        try {
            const resp = await fetch(`${HOST_API}/todos/${todoId}`, {
                method: "DELETE"
            })

            if(resp.status === 204) {
                dispatch(deleteTodo({ id: todoId, listId: listId}))
            }

        } catch(e) {
            console.error(e)
        }
    }


    const onEditItemTodo = (todo) => {
        setEditing(true)
        setItemUpdate(todo)
        setItem(todo.name)

    }

    const onEditCompletedTodo = async(todo) => {

        try {
            const resp =  await fetch(`${HOST_API}/todos`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo),
            })

            if(resp.status ===  200) {
                dispatch(editTodo({
                    listId: listId,
                    todo: todo
                }))
            }

            setEditing(false)
            //setItem("")
            setItemUpdate({id: null, name: "", completed: false, listId: listId})

        } catch(e) {
            console.error(e)
        }
    }

    return (
        <article className={ style.Table }>

            <section className={ style.Table_Column }>
                <h3>ID</h3>
            </section>

            <section>
                <h3>Tarea</h3>
            </section>

            <section>
                <h3>&#x2713;</h3>
            </section>

            <section className={ style.Table_Rows } >
                {
                    (todos && todos.length)
                        ? todos.map((todo) => (
                            <Row
                                key={todo.id}
                                todo={todo}
                                onDelete={ onDeleteTodo }
                                onEditItemTodo= { onEditItemTodo}
                                onEditCompletedTodo={ onEditCompletedTodo}
                            />
                        ))
                        : <span className={ style.Table_Advice}>Crea tu primer todo</span>
                }

            </section >
      </article>
    )
}
