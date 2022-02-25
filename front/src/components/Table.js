import {  useContext } from 'react'
//context-stroe
import {  Store } from '../context/AppContext'
//actions
import { deleteTodo, editTodo } from '../actions'
//components
import { Row } from "./Row"
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
        <div>
            <table >
                <thead>
                    <tr>
                    <td>ID</td>
                    <td>Tarea</td>
                    <td>¿Completado?</td>
                    </tr>
                </thead>
                <tbody>
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
                            : <span>Crea tu primer todo</span>
                    }
                </tbody>
            </table>
      </div>
    )
}
