"use client"

import type React from "react"
import {ChevronDownIcon, ChevronUpIcon} from "../icons"

type SortField = "name" | "dosage" | "frequency" | "duration" | "price" | "total_doses" | "status"
type SortDirection = "asc" | "desc"

interface SortOption {
    value: SortField
    label: string
}

interface MobileSortControlsProps {
    sortField: SortField | null
    sortDirection: SortDirection
    onSortFieldChange: (field: SortField | null) => void
    onSortDirectionToggle: () => void
    options: SortOption[]
}

export const MobileSortControls: React.FC<MobileSortControlsProps> = ({
                                                                          sortField,
                                                                          sortDirection,
                                                                          onSortFieldChange,
                                                                          onSortDirectionToggle,
                                                                          options,
                                                                      }) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const field = e.target.value as SortField | ""
        onSortFieldChange(field === "" ? null : field)
    }

    return (
        <div className="mobile-sort-controls">
            <div className="mobile-sort-select">
                <label htmlFor="mobile-sort-field">Сортировать по:</label>
                <select
                    id="mobile-sort-field"
                    value={sortField || ""}
                    onChange={handleSortChange}
                    className="mobile-sort-field"
                >
                    <option value="">Без сортировки</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {sortField && (
                <button className="mobile-sort-direction" onClick={onSortDirectionToggle}>
                    {sortDirection === "asc" ? (
                        <>
                            <ChevronUpIcon size={16}/>
                            <span>По возрастанию</span>
                        </>
                    ) : (
                        <>
                            <ChevronDownIcon size={16}/>
                            <span>По убыванию</span>
                        </>
                    )}
                </button>
            )}
        </div>
    )
}
