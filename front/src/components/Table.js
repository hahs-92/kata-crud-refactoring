//components
import { Row } from "./Row"
//api-url
const HOST_API = "http://localhost:8080/api"

export const Table = ({
    todos, setList, listId,setEditing, setTodoUpdate, setItem
}) => {

    const deleteTodo = async(idTodo) => {

        try {
            const resp = await fetch(`${HOST_API}/todos/${idTodo}`, {
                method: "DELETE"
            })

            // if(resp.status === "204") {
            //     setList(prev => prev[listId].todos.filter(todo => todo.id !== idTodo))
            // }

        } catch(e) {
            console.error(e)
        }
    }

    const activeUpdate = (todo) => {
        setEditing(true)
        setItem(todo.name)
        setTodoUpdate(todo)
    }

    // const editTodo = async(todo) => {

    //     todo.name = todoItem

    //     try {
    //         const resp =  await fetch(`${HOST_API}/todos`, {
    //             method: "PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(todo),
    //         })

    //         if(resp.status === "204") {
    //             setList(prev => prev[listId].todos.map(t => t.id === todo.id ? todo : t))
    //         }

    //         setTodoItem("")
    //         setEditing(false)

    //     } catch(e) {
    //         console.error(e)
    //     }
    // }

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
                        todos && todos.map((todo) => (
                            <Row
                                key={todo.id}
                                todo={todo}
                                onDelete={ deleteTodo }
                                activeUpdate={activeUpdate}
                            />
                        ))
                    }
                </tbody>
            </table>
      </div>
    )
}
