export const Row = ({todo, onDelete, onEditItemTodo, onEditCompletedTodo}) => {

    const onHandleChange = (event) => {
        todo.completed = event.target.checked
        onEditCompletedTodo(todo)
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
                <button onClick={ () => onEditItemTodo(todo)}>Editar</button>
            </td>
        </tr>
    )
}
