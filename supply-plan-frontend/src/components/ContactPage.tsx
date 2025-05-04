"use client"

import { useState, useRef } from "react"
import "./styles/contacts-page.css"

export function ContactsPage() {
    const [isAnimating, setIsAnimating] = useState(false)
    const avatarRef = useRef<HTMLDivElement>(null)

    const handleAvatarClick = () => {
        if (isAnimating) return // Предотвращаем повторные клики во время анимации

        setIsAnimating(true)

        // Сбрасываем класс анимации после завершения
        const animationDuration = 1000 // 1 секунда
        setTimeout(() => {
            setIsAnimating(false)
        }, animationDuration)

        // Сбрасываем текущую анимацию, если она уже была применена
        if (avatarRef.current) {
            avatarRef.current.classList.remove("rotate-once")
            // Этот трюк заставляет браузер перерисовать элемент
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                                <span>GitHub:</span>
                                <a href="https://github.com/Vawlik" target="_blank" rel="noopener noreferrer">
                                    Vawlik
                                </a>
                            </div>
                            <div className="contact-item">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                <span>Email:</span>
                                <a href="mailto:1559903@bsuedu.ru">1559903@bsuedu.ru</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-info">
                    <h3>О разработчике</h3>
                    <p>
                        Я разработчик данного проекта, специализирующийся на создании веб-приложений для медицинской сферы. Мой опыт
                        включает разработку систем поддержки принятия решений, автоматизацию бизнес-процессов и создание интерфейсов
                        для работы с медицинскими данными.
                    </p>
                    <p>
                        Если у вас есть вопросы по работе приложения или предложения по его улучшению, пожалуйста, свяжитесь со мной
                        по указанным контактам.
                    </p>
                </div>
            </div>
        </div>
    )
}
