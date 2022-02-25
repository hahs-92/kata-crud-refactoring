import { useEffect, useState } from "react"
//components
import { List } from './List'
import { Form } from "./Form"

//url-api
const HOST_API = "http://localhost:8080/api"

const data = [
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
]


export const Dashboard = () => {
    const [ newList, setNewList] = useState("")
    const [ list, setList] = useState([])

    const getList = async() => {
        try {
            const resp = await fetch(`${HOST_API}/lists`)
            const listResp = await resp.json()

            setList(listResp)
        }catch(e) {
            console.error(e)
        }
    }

    const addNewList = async() => {
        try {
            const resp = await fetch(`${HOST_API}/lists`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newList}),
            })

            const listcreated = await resp.json()


            if(resp.status === "201") {
                setList(list.concat(listcreated))
            }

            setNewList("")
        } catch(e) {
            console.error(e)
        }
    }


    useEffect(() => {
        getList()
    },[])

    return(
        <section>
            <section>
                <Form
                    valueTitle="Crear Lista"
                    placeholder="Ingresa una lista"
                    value={newList}
                    setValue={setNewList}
                    cb={addNewList}
                />
            </section>

            <section>
                {
                    list && list.map(l => (
                        <List
                            key={l.id}
                            listId={l.id}
                            todos={ l.todos}
                            name={l.name}
                            setList={setList}
                        />
                    ))
                }
            </section>
        </section>
    )
}
