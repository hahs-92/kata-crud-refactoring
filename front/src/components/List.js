//components
import { Table } from './Table'
import { Form } from './Form'
import { useState } from 'react/cjs/react.development'
//url-api
const HOST_API = "http://localhost:8080/api"


export const List = ({listId, name, todos, setList}) => {
    const [ newTodo, setNewTodo] = useState("")

    const addNewTodo = async () => {
        try {
            const resp = await fetch(`${HOST_API}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {name: newTodo,listId}
                ),
            })

            const todoCreated = await resp.json()


            if(resp.status === "201") {
                setList(prev => prev[listId].todos.concat(todoCreated))
            }
            console.log({name: newTodo,listId})

            setNewTodo("")
        } catch(e) {
            console.error(e)
        }
    }

    const deleteList = async() => {
        try {
            const resp = await fetch(`${HOST_API}/list/${listId}`, {
                method: "DELETE"
            })

            if(resp.status === "204") {
                setList(prev => prev.filter(list => list.id !== listId))
            }
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
                    valueTitle="Crear Todo"
                    placeholder="Ingresa un todo"
                    value={newTodo}
                    setValue={setNewTodo}
                    cb={addNewTodo}
                />
            </section>

            <section>
                <Table todos={ todos }/>
            </section>

        </article>
    )
}
