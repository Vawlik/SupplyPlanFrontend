import type React from "react"
import {LoaderIcon} from "../icons"

export const LoadingState: React.FC = () => {
    return (
        <div className="loading-container">
            <LoaderIcon size={32}/>
            <p>Формирование плана снабжения...</p>
        </div>
    )
}
