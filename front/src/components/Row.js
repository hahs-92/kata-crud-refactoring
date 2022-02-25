export const Row = ({todo, onDelete, activeUpdate, setCheck}) => {

    const onHandleChange = (event) => {
        setCheck(event.target.checked)
    }

    const decorationDone = {
        textDecoration: 'line-through'
    }

    return(
        <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>
                <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={(e) => onHandleChange(e)}>
                </input>
            </td>
            <td>
                <button onClick={() => onDelete(todo.id)}>Eliminar</button>
            </td>
            <td>
                <button onClick={ () => activeUpdate(todo) }>Editar</button>
            </td>
        </tr>
    )
}
