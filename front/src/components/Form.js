import style from '../styles/components/Form.module.css'

export const Form = ({
        placeholder,
        valueTitle,
        value,setValue,
        cb,
        desktop
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
            className={ !desktop ? `${style.Form_Input }` :`${style.Form_Input } ${ style.Desktop }` }
            type="text"
            name="name"
            placeholder={ placeholder }
            value={value}
            onChange={handleOnChange}
        >
        </input>

        <input
            className={!desktop ? `${style.Form_Button }` :`${style.Form_Button } ${ style.Desktop }`}
            type="submit"
            value={ valueTitle }
        />

        </form>
    )
}
