"use client"

import { useState } from "react"
import { DiseaseForm } from "./DiseaseForm"
import { SupplyPlanTable } from "./SupplyPlanTable"
import { ThemeToggle } from "./ThemeToggle"
import "./styles/medical-supply-planner.css"

export function MedicalSupplyPlanner() {
    const [activeTab, setActiveTab] = useState<"form" | "results">("form")

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <div className="logo">
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
                            <path d="m12 6 4 6-8 6 4-12"></path>
                        </svg>
                        <h1>Медицинский планировщик</h1>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="app-main">
                <div className="main-content">
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
                            <span>План снабжения лекарственными средствами</span>
                        </h2>

                        <div className="tabs-mobile">
                            <button onClick={() => setActiveTab("form")} className={activeTab === "form" ? "active" : ""}>
                                Форма
                            </button>
                            <button onClick={() => setActiveTab("results")} className={activeTab === "results" ? "active" : ""}>
                                Результаты
                            </button>
                        </div>
                    </div>

                    <div className="app-content">
                        <div className={`form-container ${activeTab === "form" ? "active" : ""}`}>
                            <DiseaseForm onSubmit={() => setActiveTab("results")} />
                        </div>
                        <div className={`results-container ${activeTab === "results" ? "active" : ""}`}>
                            <SupplyPlanTable />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <div className="footer-content">© {new Date().getFullYear()} Медицинский планировщик снабжения</div>
            </footer>
        </div>
    )
}

