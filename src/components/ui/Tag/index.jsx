import style from './style.module.scss'

export default function Tag({ children, variant = 'light' }) {

    const tagClasses = `${style.tag} ${style[variant]}`;

    return (
        <span className={tagClasses}>
            {children}
        </span>
    );
}