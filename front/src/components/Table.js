import {  useContext } from 'react'
//context-stroe
import {  Store } from '../context/AppContext'
//actions
import { deleteTodo, editTodo } from '../actions'
//components
import { Row } from "./Row"
//custom-hooks
import { useCrud } from '../hooks/useCrud'
//styles
import style from '../styles/components/Table.module.css'


export const Table = ({todos, listId, setEditing, setItemUpdate, setItem}) => {
    const { dispatch } = useContext(Store)
    const { udpate, remove } = useCrud()

    const onDeleteTodo = (todoId) => {
        remove({query:"todos", param: todoId}, (err, data) => {
            dispatch(deleteTodo({
                id: todoId,
                listId: listId
            }))
        })
    }


    const onEditItemTodo = (todo) => {
        setEditing(true)
        setItemUpdate(todo)
        setItem(todo.name)
    }

    const onEditCompletedTodo = async(todo) => {

        udpate({ query: "todos", payload:todo }, (err, data) => {
            dispatch(editTodo({
                listId: listId,
                todo: data
            }))
        })

        setEditing(false)
        //setItem("")
        setItemUpdate({id: null, name: "", completed: false, listId: listId})
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
