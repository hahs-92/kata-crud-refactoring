import { useContext, useRef, useState } from "react"
//context
import { Store } from "../context/AppContext"
//url-api
const HOST_API = "http://localhost:8080/api"



export const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store)
    const item = todo.item
    const [state, setState] = useState(item)

    const onAdd = (event) => {

        event.preventDefault()

        const request = {
            name: state.name,
            id: null,
            completed: false
            }


        fetch(`${HOST_API}/todos`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((todo) => {
            dispatch({ type: "add-item", item: todo })
            setState({ name: "" })
            formRef.current.reset()
        })
    }

    const onEdit = (event) => {

        event.preventDefault()

        const request = {
            id: item.id,
            name: state.name,
            isCompleted: item.isCompleted
        }


        fetch(`${HOST_API}/todos`, {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((todo) => {
            dispatch({ type: "update-item", item: todo })
            setState({ name: "" })
            formRef.current.reset()
        })
    }

    return (
        <form ref={formRef}>
        <input
            type="text"
            name="name"
            placeholder="¿Qué piensas hacer hoy?"
            defaultValue={item.name}
            onChange={(event) => {
            setState({ ...state, name: event.target.value })
            }}
        >
        </input>

        {item.id && <button onClick={onEdit}>Actualizar</button>}
        {!item.id && <button onClick={onAdd}>Crear</button>}

        </form>
    )
}
