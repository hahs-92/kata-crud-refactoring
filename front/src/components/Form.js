import style from '../styles/components/Form.module.css'

export const Form = ({
        placeholder,
        valueTitle,
        value,setValue,
        cb
    }) => {


    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        cb()
    }

    return (
        <form className={style.Form } onSubmit={ handleOnSubmit }>
        <input
            className={ style.Form_Input }
            type="text"
            name="name"
            placeholder={ placeholder }
            value={value}
            onChange={handleOnChange}
        >
        </input>

        <input
            className={style.Form_Button }
            type="submit"
            value={ valueTitle }
        />

        </form>
    )
}
