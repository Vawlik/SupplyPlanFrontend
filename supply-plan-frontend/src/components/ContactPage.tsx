import {useRef, useState} from "react"
import {GithubIcon, MailIcon} from "./icons"
import "./styles/contacts-page.css"

export function ContactsPage() {
    const [isAnimating, setIsAnimating] = useState(false)
    const avatarRef = useRef<HTMLDivElement>(null)

    const handleAvatarClick = () => {
        if (isAnimating) return

        setIsAnimating(true)

        const animationDuration = 1000
        setTimeout(() => {
            setIsAnimating(false)
        }, animationDuration)

        if (avatarRef.current) {
            avatarRef.current.classList.remove("rotate-once")
            void avatarRef.current.offsetWidth
            avatarRef.current.classList.add("rotate-once")
        }
    }

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <h2>Контакты</h2>
                <div className="contacts-header-line"></div>
            </div>

            <div className="contacts-content">
                <div className="contact-card">
                    <div className="avatar-container">
                        <div ref={avatarRef} className="avatar-wrapper" onClick={handleAvatarClick}>
                            <img
                                src="https://avatars.githubusercontent.com/u/124059455?v=4"
                                alt="GitHub аватар"
                                className="avatar-image"
                            />
                        </div>
                        <div className="avatar-hint">Нажмите на аватар для вращения</div>
                    </div>

                    <div className="contact-info">
                        <h3>
                            <a href="https://github.com/Vawlik" target="_blank" rel="noopener noreferrer">
                                Виноходов Даниил Алексеевич
                            </a>
                        </h3>
                        <div className="contact-details">
                            <div className="contact-item">
                                <GithubIcon size={18}/>
                                <span>GitHub:</span>
                                <a href="https://github.com/Vawlik" target="_blank" rel="noopener noreferrer">
                                    Vawlik
                                </a>
                            </div>
                            <div className="contact-item">
                                <MailIcon size={18}/>
                                <span>Email:</span>
                                <a href="mailto:1559903@bsuedu.ru">1559903@bsuedu.ru</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-info">
                    <h3>О разработчике</h3>
                    <p>
                        Я разработчик данного проекта, специализирующийся на создании веб-приложений для медицинской
                        сферы. Мой опыт
                        включает разработку систем поддержки принятия решений, автоматизацию бизнес-процессов и создание
                        интерфейсов
                        для работы с медицинскими данными.
                    </p>
                    <p>
                        Если у вас есть вопросы по работе приложения или предложения по его улучшению, пожалуйста,
                        свяжитесь со мной
                        по указанным контактам.
                    </p>
                </div>
            </div>
        </div>
    )
}
