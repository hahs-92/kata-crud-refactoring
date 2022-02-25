//components
import { Table } from './Table'
import { Form } from './Form'
import { useState } from 'react/cjs/react.development'
//url-api
const HOST_API = "http://localhost:8080/api"


export const List = ({listId, name, todos, setList}) => {

    const [ todoItem, setTodoItem] = useState("")
    const [editing, setEditing] = useState(false)
    const [ check, setCheck] = useState(false)
    const [ todoUpate, setTodoUpdate] = useState({id:null, name: "", completed: false, listId: listId})

    const addNewTodo = async () => {
        try {
            const resp = await fetch(`${HOST_API}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {name: todoItem,listId}
                ),
            })

            const todoCreated = await resp.json()


            if(resp.status === "201") {
                setList(prev => prev[listId].todos.concat(todoCreated))
            }
            console.log({name: todoItem,listId})

            setTodoItem("")
        } catch(e) {
            console.error(e)
        }
    }

    const deleteList = async() => {
        try {
            const resp = await fetch(`${HOST_API}/lists/${listId}`, {
                method: "DELETE"
            })

            if(resp.status === "204") {
                setList(prev => prev.filter(list => list.id !== listId))
            }
        } catch(e) {
            console.error(e)
        }
    }


    const editTodo = async()  => {

        setTodoUpdate({
        ...todoUpate,
            name: todoItem
        })

        try {
            const resp =  await fetch(`${HOST_API}/todos`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoUpate),
            })

            if(resp.status === "204") {
                setList(prev => prev[listId].todos.map(t => t.id === todoUpate.id ? todoUpate : t))
            }

            setTodoItem("")
            setEditing(false)

        } catch(e) {
            console.error(e)
        }
    }


    return(
        <article>
            <section>
                <h2>{name}</h2>
                <img src="" alt="remove-icon" onClick={deleteList}/>
            </section>

            <section>
                <Form
                    valueTitle={ editing ? "Editar" : "Crear"}
                    placeholder="Ingresa un todo"
                    value={ todoItem }
                    setValue={setTodoItem}
                    cb={editing ? editTodo : addNewTodo}
                />
            </section>

            <section>
                <Table
                    todos={ todos }
                    setList={setList}
                    listId={listId}
                    setEditing={setEditing}
                    setItem={setTodoItem}
                    setTodoUpdate={ setTodoUpdate}
                />
            </section>

        </article>
    )
}
