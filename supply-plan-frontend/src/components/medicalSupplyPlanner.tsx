"use client"

import { useState } from "react"
import { DiseaseForm } from "./DiseaseForm"
import { SupplyPlanTable } from "./SupplyPlanTable"
import "./styles/medical-supply-planner.css"

export function MedicalSupplyPlanner() {
    const [activeTab, setActiveTab] = useState<"form" | "results">("form")
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleFormSubmit = () => {
        setActiveTab("results")
        setHasSubmitted(true)
    }

    return (
        <>
            <div className="section-header">
                <h2>
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
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <span>План снабжения лекарствами</span>
                </h2>

                <div className="tabs-mobile">
                    <button
                        onClick={() => setActiveTab("form")}
                        className={activeTab === "form" ? "active" : ""}
                        aria-label="Показать форму"
                    >
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
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 3v18" />
                            <path d="m14 9 3 3-3 3" />
                        </svg>
                        <span>Форма</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("results")}
                        className={activeTab === "results" ? "active" : ""}
                        aria-label="Показать результаты"
                    >
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
                            <path d="M8 3H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1" />
                            <path d="M12 17v.01" />
                            <path d="M12 14v-4" />
                            <path d="M8 3h8v3H8z" />
                        </svg>
                        <span>Результаты</span>
                    </button>
                </div>
            </div>

            <div className="app-content">
                <div className={`form-container ${activeTab === "form" ? "active" : ""}`}>
                    <DiseaseForm onSubmit={handleFormSubmit} />
                </div>
                <div className={`results-container ${activeTab === "results" ? "active" : ""}`}>
                    <SupplyPlanTable hasSubmitted={hasSubmitted} />
                </div>
            </div>
        </>
    )
}
