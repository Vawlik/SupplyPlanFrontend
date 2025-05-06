import type React from "react"
import {FileCodeIcon, MinusCircleIcon} from "../icons"

interface EmptyStateProps {
    type: "no-submission" | "no-data"
}

export const EmptyState: React.FC<EmptyStateProps> = ({type}) => {
    if (type === "no-submission") {
        return (
            <div className="empty-container">
                <FileCodeIcon size={32}/>
                <p>Выберите заболевание и количество пациентов, затем нажмите "Сформировать план снабжения"</p>
                <p className="empty-hint">Результаты будут отображены здесь</p>
            </div>
        )
    }

    return (
        <div className="no-data-container">
            <MinusCircleIcon size={32}/>
            <p className="no-data-title">Нет данных</p>
            <p className="no-data-message">
                Для выбранного заболевания и количества пациентов не найдено данных о лекарственных средствах
            </p>
        </div>
    )
}
