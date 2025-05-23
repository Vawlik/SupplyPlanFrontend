import type React from "react"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {fetchSupplyPlanFailure, fetchSupplyPlanStart, fetchSupplyPlanSuccess} from "../store/supplyPlanSlice.ts"
import {AlertCircleIcon, ChevronDownIcon, LoaderIcon, PlusIcon} from "./icons"
import axios from "axios"
import "./styles/disease-form.css"

interface DiseaseFormProps {
    onSubmit?: () => void
}

export function DiseaseForm({onSubmit}: DiseaseFormProps) {
    const [diseaseId, setDiseaseId] = useState<string>("1")
    const [numPatients, setNumPatients] = useState<number>(1)
    const [diseases, setDiseases] = useState<{ id: number; name: string }[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [isFormValid, setIsFormValid] = useState<boolean>(true)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDiseases = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get("http://localhost:5433/diseases")
                // Преобразуем массив массивов в массив объектов
                const diseasesData = response.data.map(([id, name]: [number, string]) => ({id, name}))
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

    useEffect(() => {
        // Валидация формы
        setIsFormValid(!!diseaseId && numPatients >= 1)
    }, [diseaseId, numPatients])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isFormValid) {
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

            // Вызываем onSubmit в любом случае, даже если данных нет
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

            // Вызываем onSubmit даже при ошибке, чтобы показать пустое состояние
            if (onSubmit) onSubmit()
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
                    {error && (
                        <div className="error-message">
                            <AlertCircleIcon size={16}/>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="disease">Заболевание</label>
                        <div className="select-wrapper">
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
                            <ChevronDownIcon className="select-arrow" size={16}/>
                        </div>
                        {diseases.length === 0 && !isLoading && !error &&
                            <p className="empty-message">Список заболеваний пуст</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="patients">Количество пациентов</label>
                        <div className="number-input-wrapper">
                            <button
                                type="button"
                                className="number-control"
                                onClick={() => setNumPatients((prev) => Math.max(1, prev - 1))}
                                disabled={isLoading || numPatients <= 1}
                            >
                                -
                            </button>
                            <input
                                id="patients"
                                type="number"
                                min={1}
                                value={numPatients}
                                onChange={(e) => setNumPatients(Number.parseInt(e.target.value) || 1)}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="number-control"
                                onClick={() => setNumPatients((prev) => prev + 1)}
                                disabled={isLoading}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-footer">
                    <button
                        type="submit"
                        className={`submit-button ${!isFormValid ? "disabled" : ""}`}
                        disabled={isLoading || !isFormValid}
                    >
                        {isLoading ? (
                            <>
                                <LoaderIcon className="spinner" size={20}/>
                                <span>Формирование плана...</span>
                            </>
                        ) : (
                            <>
                                <PlusIcon size={20}/>
                                <span>Сформировать план снабжения</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
