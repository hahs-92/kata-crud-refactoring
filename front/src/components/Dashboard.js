import { useState } from "react"
//components
import { List } from './List'


export const Dashboard = () => {
    const [ list, setList] = useState([
        {
            id: 1,
            name: "list test",
            todos: [
                {
                    id: 10,
                    name: "todo test",
                    completed: false
                },
                {
                    id: 50,
                    name: "todo test 2",
                    completed: true
                }
            ]
        },
        {
            id: 2,
            name: "list test",
            todos: [
                {
                    id: 10,
                    name: "todo test",
                    completed: false
                }
            ]
        },
        {
            id: 5,
            name: "list trty",
            todos: []
        }

    ])

    return(
        <section>
            <form>
                <input type="text" placeholder="Ingresa el nombre de una lista" />
                <input type="submit" value="New List"/>
            </form>

            <section>
                {
                    list && list.map(l => (
                        <List key={l.id} todos={ l.todos} name={l.name}/>
                    ))
                }
            </section>
        </section>
    )
}
