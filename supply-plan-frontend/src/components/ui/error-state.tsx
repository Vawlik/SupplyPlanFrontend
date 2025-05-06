import type React from "react"
import {AlertCircleIcon} from "../icons"

interface ErrorStateProps {
    message: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({message}) => {
    return (
        <div className="error-container">
            <AlertCircleIcon size={32}/>
            <p className="error-title">Ошибка</p>
            <p className="error-message">{message}</p>
        </div>
    )
}
