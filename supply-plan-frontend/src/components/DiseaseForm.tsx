"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchSupplyPlanStart, fetchSupplyPlanSuccess, fetchSupplyPlanFailure } from "../store/supplyPlanSlice.ts"
import axios from "axios"
import "./styles/disease-form.css"

interface DiseaseFormProps {
    onSubmit?: () => void
}

export function DiseaseForm({ onSubmit }: DiseaseFormProps) {
    const [diseaseId, setDiseaseId] = useState<string>("1")
    const [numPatients, setNumPatients] = useState<number>(1)
    const [diseases, setDiseases] = useState<{ id: number; name: string }[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDiseases = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get("http://localhost:5433/diseases")
                // Преобразуем массив массивов в массив объектов
                const diseasesData = response.data.map(([id, name]: [number, string]) => ({ id, name }))
                setDiseases(diseasesData)
            } catch (error) {
                console.error("Ошибка при загрузке списка заболеваний:", error)
                setError("Не удалось загрузить список заболеваний")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDiseases()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!diseaseId || numPatients < 1) {
            setError("Пожалуйста, заполните все поля корректно")
            return
        }

        dispatch(fetchSupplyPlanStart())
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post("http://localhost:5433/", {
                disease_id: Number.parseInt(diseaseId),
                num_patients: numPatients,
            })

            dispatch(fetchSupplyPlanSuccess(response.data))
            if (onSubmit) onSubmit()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || error.message
                dispatch(fetchSupplyPlanFailure(errorMessage))
                setError(errorMessage)
            } else {
                dispatch(fetchSupplyPlanFailure("Произошла неизвестная ошибка"))
                setError("Произошла неизвестная ошибка")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="form-card">
            <div className="form-header">
                <h3>Параметры плана</h3>
                <p>Выберите заболевание и укажите количество пациентов для формирования плана снабжения</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-content">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="disease">Заболевание</label>
                        <select
                            id="disease"
                            value={diseaseId}
                            onChange={(e) => setDiseaseId(e.target.value)}
                            disabled={isLoading || diseases.length === 0}
                        >
                            {diseases.map((disease) => (
                                <option key={disease.id} value={disease.id.toString()}>
                                    {disease.name}
                                </option>
                            ))}
                        </select>
                        {diseases.length === 0 && !isLoading && !error && <p className="empty-message">Список заболеваний пуст</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="patients">Количество пациентов</label>
                        <input
                            id="patients"
                            type="number"
                            min={1}
                            value={numPatients}
                            onChange={(e) => setNumPatients(Number.parseInt(e.target.value) || 1)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="form-footer">
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
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
                                Формирование плана...
                            </>
                        ) : (
                            "Сформировать план снабжения"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

