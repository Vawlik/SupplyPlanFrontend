"use client"

import { useSelector } from "react-redux"
import type { RootState } from "../store"
import "./styles/supply-plan-table.css"

interface SupplyPlanTableProps {
    hasSubmitted: boolean
}

export function SupplyPlanTable({ hasSubmitted }: SupplyPlanTableProps) {
    const { items, loading, error } = useSelector((state: RootState) => state.supplyPlan)

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    const renderContent = () => {
        if (loading) {
            return (
                <div className="loading-container">
                    <svg
                        className="spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                    </svg>
                    <p>Формирование плана снабжения...</p>
                </div>
            )
        }

        if (error) {
            return (
                <div className="error-container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p className="error-title">Ошибка</p>
                    <p className="error-message">{error}</p>
                </div>
            )
        }

        if (items.length === 0) {
            if (!hasSubmitted) {
                // Пользователь еще не отправлял форму
                return (
                    <div className="empty-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 3v18" />
                            <path d="m14 9 3 3-3 3" />
                        </svg>
                        <p>Выберите заболевание и количество пациентов, затем нажмите "Сформировать план снабжения"</p>
                        <p className="empty-hint">Результаты будут отображены здесь</p>
                    </div>
                )
            } else {
                // Пользователь отправил форму, но данных нет
                return (
                    <div className="no-data-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        <p className="no-data-title">Нет данных</p>
                        <p className="no-data-message">
                            Для выбранного заболевания и количества пациентов не найдено данных о лекарственных средствах
                        </p>
                    </div>
                )
            }
        }

        return (
            <div className="table-responsive">
                <div className="table-container">
                    <table className="supply-table">
                        <thead>
                        <tr>
                            <th className="column-number">№</th>
                            <th>Лекарственное средство</th>
                            <th>Дозировка</th>
                            <th>Частота приема</th>
                            <th>Длительность курса</th>
                            <th className="column-price">Цена</th>
                            <th className="column-doses">Общее кол-во доз</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className={item.status === "рекомендовано" ? "recommended-row" : ""}>
                                <td className="column-number">{index + 1}</td>
                                <td className="column-name">{item.name}</td>
                                <td>{item.dosage}</td>
                                <td>{item.frequency}</td>
                                <td>{item.duration}</td>
                                <td className="column-price">{formatCurrency(item.price)}</td>
                                <td className="column-doses">{item.total_doses.toLocaleString()}</td>
                                <td>
                                    {item.status === "рекомендовано" ? (
                                        <span className="status-recommended">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Рекомендовано</span>
                      </span>
                                    ) : (
                                        <span className="status-not-recommended">Не рекомендовано</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Мобильное представление данных - показываем только на мобильных устройствах */}
                <div className="mobile-cards">
                    {items.map((item, index) => (
                        <div key={index} className={`mobile-card ${item.status === "рекомендовано" ? "recommended" : ""}`}>
                            <div className="mobile-card-header">
                                <span className="mobile-card-number">{index + 1}</span>
                                <h4 className="mobile-card-name">{item.name}</h4>
                                {item.status === "рекомендовано" ? (
                                    <span className="mobile-status-recommended">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </span>
                                ) : (
                                    <span className="mobile-status-not-recommended"></span>
                                )}
                            </div>
                            <div className="mobile-card-content">
                                <div className="mobile-card-row">
                                    <span className="mobile-card-label">Дозировка:</span>
                                    <span className="mobile-card-value">{item.dosage}</span>
                                </div>
                                <div className="mobile-card-row">
                                    <span className="mobile-card-label">Частота приема:</span>
                                    <span className="mobile-card-value">{item.frequency}</span>
                                </div>
                                <div className="mobile-card-row">
                                    <span className="mobile-card-label">Длительность курса:</span>
                                    <span className="mobile-card-value">{item.duration}</span>
                                </div>
                                <div className="mobile-card-row">
                                    <span className="mobile-card-label">Цена:</span>
                                    <span className="mobile-card-value price">{formatCurrency(item.price)}</span>
                                </div>
                                <div className="mobile-card-row">
                                    <span className="mobile-card-label">Общее кол-во доз:</span>
                                    <span className="mobile-card-value">{item.total_doses.toLocaleString()}</span>
                                </div>
                                <div className="mobile-card-row">
                                    <span className="mobile-card-label">Статус:</span>
                                    <span className="mobile-card-value">
                    {item.status === "рекомендовано" ? (
                        <span className="status-text-recommended">Рекомендовано</span>
                    ) : (
                        <span className="status-text-not-recommended">Не рекомендовано</span>
                    )}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="results-card">
            <div className="results-header">
                <h3>План снабжения</h3>
                <p>Рекомендуемые лекарственные средства и их количество</p>
            </div>
            <div className="results-content">{renderContent()}</div>
        </div>
    )
}
