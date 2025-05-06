import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import type {RootState} from "../store"
import type {SupplyPlanItem} from "../store/supplyPlanSlice.ts"
import {CheckCircleIcon, ChevronDownIcon, ChevronUpIcon} from "./icons"
import {StatusBadge} from "./ui/status-badge.tsx"
import {MobileSortControls} from "./ui/mobile-sort-controls.tsx"
import {EmptyState} from "./ui/empty-state.tsx"
import {LoadingState} from "./ui/loading-state.tsx"
import {ErrorState} from "./ui/error-state.tsx"
import {formatCurrency} from "../lib/utils.ts"
import "./styles/supply-plan-table.css"

interface SupplyPlanTableProps {
    hasSubmitted: boolean
}

type SortField = "name" | "dosage" | "frequency" | "duration" | "price" | "total_doses" | "status"
type SortDirection = "asc" | "desc"

interface SortOption {
    value: SortField
    label: string
}

export function SupplyPlanTable({hasSubmitted}: SupplyPlanTableProps) {
    const {items, loading, error} = useSelector((state: RootState) => state.supplyPlan)
    const [sortedItems, setSortedItems] = useState<SupplyPlanItem[]>([])
    const [sortField, setSortField] = useState<SortField | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

    const sortOptions: SortOption[] = [
        {value: "name", label: "Название"},
        {value: "dosage", label: "Дозировка"},
        {value: "frequency", label: "Частота приема"},
        {value: "duration", label: "Длительность курса"},
        {value: "price", label: "Цена"},
        {value: "total_doses", label: "Количество доз"},
        {value: "status", label: "Статус"},
    ]

    useEffect(() => {
        if (items.length === 0) {
            setSortedItems([])
            return
        }

        const sorted = [...items]

        if (sortField) {
            sorted.sort((a, b) => {
                let valueA = a[sortField]
                let valueB = b[sortField]

                if (sortField === "price" || sortField === "total_doses") {
                    valueA = Number(valueA)
                    valueB = Number(valueB)
                } else {
                    valueA = String(valueA).toLowerCase()
                    valueB = String(valueB).toLowerCase()
                }

                if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
                if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
                return 0
            })
        }

        setSortedItems(sorted)
    }, [items, sortField, sortDirection])

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleMobileSortChange = (field: SortField | null) => {
        setSortField(field)
    }

    const toggleMobileSortDirection = () => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    }

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return null

        return sortDirection === "asc" ? (
            <ChevronUpIcon className="sort-icon" size={16}/>
        ) : (
            <ChevronDownIcon className="sort-icon" size={16}/>
        )
    }

    const renderContent = () => {
        if (loading) {
            return <LoadingState/>
        }

        if (error) {
            return <ErrorState message={error}/>
        }

        if (items.length === 0) {
            if (!hasSubmitted) {
                return <EmptyState type="no-submission"/>
            } else {
                return <EmptyState type="no-data"/>
            }
        }

        return (
            <div className="table-responsive">
                <MobileSortControls
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSortFieldChange={handleMobileSortChange}
                    onSortDirectionToggle={toggleMobileSortDirection}
                    options={sortOptions}
                />

                <div className="table-container">
                    <table className="supply-table">
                        <thead>
                        <tr>
                            <th className="column-number">№</th>
                            <th className="sortable-header" onClick={() => handleSort("name")}>
                                <div className="header-content">
                                    Лекарственное средство
                                    {getSortIcon("name")}
                                </div>
                            </th>
                            <th className="sortable-header" onClick={() => handleSort("dosage")}>
                                <div className="header-content">
                                    Дозировка
                                    {getSortIcon("dosage")}
                                </div>
                            </th>
                            <th className="sortable-header" onClick={() => handleSort("frequency")}>
                                <div className="header-content">
                                    Частота приема
                                    {getSortIcon("frequency")}
                                </div>
                            </th>
                            <th className="sortable-header" onClick={() => handleSort("duration")}>
                                <div className="header-content">
                                    Длительность курса
                                    {getSortIcon("duration")}
                                </div>
                            </th>
                            <th className="column-price sortable-header" onClick={() => handleSort("price")}>
                                <div className="header-content">
                                    Цена
                                    {getSortIcon("price")}
                                </div>
                            </th>
                            <th className="column-doses sortable-header" onClick={() => handleSort("total_doses")}>
                                <div className="header-content">
                                    Общее кол-во доз
                                    {getSortIcon("total_doses")}
                                </div>
                            </th>
                            <th className="sortable-header" onClick={() => handleSort("status")}>
                                <div className="header-content">
                                    Статус
                                    {getSortIcon("status")}
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {(sortedItems.length > 0 ? sortedItems : items).map((item, index) => (
                            <tr key={index} className={item.status === "рекомендовано" ? "recommended-row" : ""}>
                                <td className="column-number">{index + 1}</td>
                                <td className="column-name">{item.name}</td>
                                <td>{item.dosage}</td>
                                <td>{item.frequency}</td>
                                <td>{item.duration}</td>
                                <td className="column-price">{formatCurrency(item.price)}</td>
                                <td className="column-doses">{item.total_doses.toLocaleString()}</td>
                                <td>
                                    <StatusBadge status={item.status}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mobile-cards">
                    {(sortedItems.length > 0 ? sortedItems : items).map((item, index) => (
                        <div key={index}
                             className={`mobile-card ${item.status === "рекомендовано" ? "recommended" : ""}`}>
                            <div className="mobile-card-header">
                                <span className="mobile-card-number">{index + 1}</span>
                                <h4 className="mobile-card-name">{item.name}</h4>
                                {item.status === "рекомендовано" && (
                                    <span className="mobile-status-recommended">
                    <CheckCircleIcon size={16}/>
                  </span>
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
