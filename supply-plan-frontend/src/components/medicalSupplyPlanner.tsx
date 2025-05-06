"use client"

import {useState} from "react"
import {DiseaseForm} from "./DiseaseForm"
import {SupplyPlanTable} from "./SupplyPlanTable"
import {FileCodeIcon, FileTextIcon, HeartIcon} from "./icons"
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
                    <HeartIcon size={24}/>
                    <span>План снабжения лекарствами</span>
                </h2>

                <div className="tabs-mobile">
                    <button
                        onClick={() => setActiveTab("form")}
                        className={activeTab === "form" ? "active" : ""}
                        aria-label="Показать форму"
                    >
                        <FileCodeIcon size={16}/>
                        <span>Форма</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("results")}
                        className={activeTab === "results" ? "active" : ""}
                        aria-label="Показать результаты"
                    >
                        <FileTextIcon size={16}/>
                        <span>Результаты</span>
                    </button>
                </div>
            </div>

            <div className="app-content">
                <div className={`form-container ${activeTab === "form" ? "active" : ""}`}>
                    <DiseaseForm onSubmit={handleFormSubmit}/>
                </div>
                <div className={`results-container ${activeTab === "results" ? "active" : ""}`}>
                    <SupplyPlanTable hasSubmitted={hasSubmitted}/>
                </div>
            </div>
        </>
    )
}
