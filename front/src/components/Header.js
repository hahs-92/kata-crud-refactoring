//styles
import style  from '../styles/components/Header.module.css'
//assets
import sofkaIcon from '../assets/sofka.png'

export const Header = () => {
    return (
        <header className={ style.Header }>
            <section className={ style.Header_Wrapper}>
                <img src={sofkaIcon} alt="sofka_icon" />
            </section>
        </header>
    )
}
