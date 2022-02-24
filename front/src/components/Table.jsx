import { useContext, useEffect } from "react"
//context
import { Store } from "../context/AppContext"
//components
import { Row } from "./Row"
//url-api
const HOST_API = "http://localhost:8080/api"


export const Table = () => {
    const { dispatch, state: { todo } } = useContext(Store)
    const currentList = todo.list

    useEffect(() => {
        fetch(`${HOST_API}/todos`)
        .then(response => response.json())
        .then((list) => {
            dispatch({ type: "update-list", list })
        })
    }, [dispatch])


    const decorationDone = {
        textDecoration: 'line-through'
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
                        currentList.map((todo) => (
                            <Row key={todo.id} todo={todo}/>
                        ))
                    }
                </tbody>
            </table>
      </div>

    )
}
