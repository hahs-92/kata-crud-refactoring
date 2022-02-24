//components
import { Row } from "./Row"


export const Table = ({ todos }) => {
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
                            <Row key={todo.id} todo={todo}/>
                        ))
                    }
                </tbody>
            </table>
      </div>
    )
}
