"use client"

import { useSelector } from "react-redux"
import type { RootState } from "../store"
import "./styles/supply-plan-table.css"

export function SupplyPlanTable() {
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
                        width="24"
                        height="24"
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
                        width="24"
                        height="24"
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
            return (
                <div className="empty-container">
                    <p>Выберите заболевание и количество пациентов, затем нажмите "Сформировать план снабжения"</p>
                </div>
            )
        }

        return (
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
                        <tr key={index}>
                            <td className="column-number">{index + 1}</td>
                            <td>{item.name}</td>
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

