//styles
import style from '../styles/components/Row.module.css'
//assets
import removeIcon from '../assets/delete.png'
import editIcon from '../assets/editar.png'


export const Row = ({todo, onDelete, onEditItemTodo, onEditCompletedTodo}) => {

    const onHandleChange = (event) => {
        todo.completed = event.target.checked
        onEditCompletedTodo(todo)
    }


    const decorationDone = {
        textDecoration: 'line-through'
    }

    return(
        <article className={ style.Row } style={todo.completed ? decorationDone : {}}>
            <section className={style.Row_Item }>
                <h4>{todo.id}</h4>
            </section>
            <section className={style.Row_Item }>
                <h4>{todo.name}</h4>
            </section>
            <section className={style.Row_Item }>
                <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={(e) => onHandleChange(e)}>
                </input>
            </section>

            <section className={ style.Row_Buttons }>
                <button onClick={() => onDelete(todo.id)}>
                    <img src={ removeIcon } alt="remove_icon" title='delete' />
                </button>
                <button onClick={ () => onEditItemTodo(todo)}>
                    <img src={ editIcon } alt="edit_icon" title='edit' />
                </button>
            </section>
        </article>
    )
}
