export const Form = ({
     placeholder, valueTitle, value,setValue, cb
    }) => {

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        cb()
    }

    return (
        <form onSubmit={ handleOnSubmit }>
        <input
            type="text"
            name="name"
            placeholder={ placeholder }
            value={value}
            onChange={handleOnChange}
        >
        </input>

        <input type="submit"  value={ valueTitle } />

        </form>
    )
}
