import {CheckIcon} from "./icons"
import "./styles/about-page.css"

export function AboutPage() {
    return (
        <div className="about-container">
            <div className="about-header">
                <h2>О проекте</h2>
                <div className="about-header-line"></div>
            </div>

            <div className="about-content">
                <section className="about-section">
                    <h3>Медицинский планировщик снабжения</h3>
                    <p>
                        Данное веб-приложение предназначено для планирования снабжения медицинских учреждений
                        лекарственными
                        средствами на основе данных о заболеваниях и количестве пациентов.
                    </p>
                    <p>
                        Система позволяет медицинским работникам и администраторам быстро формировать оптимальные планы
                        закупок
                        лекарственных средств, учитывая различные факторы, такие как эффективность препаратов, их
                        стоимость,
                        доступность и другие параметры.
                    </p>
                </section>

                <section className="about-section">
                    <h3>Технология Fuzzy TOPSIS</h3>
                    <p>
                        В основе алгоритма принятия решений лежит метод Fuzzy TOPSIS (Technique for Order of Preference
                        by
                        Similarity to Ideal Solution) — многокритериальный метод принятия решений, который использует
                        нечеткую
                        логику для определения оптимальных вариантов.
                    </p>
                    <p>
                        Этот метод позволяет учитывать неопределенность и субъективность в оценках различных критериев,
                        что особенно
                        важно в медицинской сфере, где решения должны приниматься с учетом множества факторов и их
                        взаимосвязей.
                    </p>
                </section>

                <section className="about-section">
                    <h3>Преимущества системы</h3>
                    <ul className="benefits-list">
                        <li>
                            <div className="benefit-icon">
                                <CheckIcon size={24}/>
                            </div>
                            <div className="benefit-content">
                                <h4>Оптимизация расходов</h4>
                                <p>Снижение затрат на закупку лекарственных средств при сохранении качества лечения</p>
                            </div>
                        </li>
                        <li>
                            <div className="benefit-icon">
                                <CheckIcon size={24}/>
                            </div>
                            <div className="benefit-content">
                                <h4>Экономия времени</h4>
                                <p>Автоматизация процесса планирования снабжения и формирования заказов</p>
                            </div>
                        </li>
                        <li>
                            <div className="benefit-icon">
                                <CheckIcon size={24}/>
                            </div>
                            <div className="benefit-content">
                                <h4>Повышение качества лечения</h4>
                                <p>Рекомендации по наиболее эффективным препаратам для каждого заболевания</p>
                            </div>
                        </li>
                        <li>
                            <div className="benefit-icon">
                                <CheckIcon size={24}/>
                            </div>
                            <div className="benefit-content">
                                <h4>Адаптивность</h4>
                                <p>Учет индивидуальных особенностей медицинских учреждений и их потребностей</p>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
