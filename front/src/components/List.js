//components
import { Table } from './Table'
import { Form } from './Form'


export const List = ({todos, name}) => {

    return(
        <article>
            <section>
                <h2>{name}</h2>
                <h2>Eliminar</h2>
            </section>

            <section>
                <Form />
            </section>

            <section>
                <Table todos={ todos }/>
            </section>

        </article>
    )
}
