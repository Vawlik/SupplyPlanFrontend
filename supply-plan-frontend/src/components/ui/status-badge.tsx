import type React from "react"
import {CheckCircleIcon} from "../icons"
import {cn} from "../../lib/utils"

interface StatusBadgeProps {
    status: string
    className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({status, className}) => {
    const isRecommended = status === "рекомендовано"

    if (isRecommended) {
        return (
            <span
                className={cn(
                    "status-recommended inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                    className,
                )}
            >
        <CheckCircleIcon size={16}/>
        <span>Рекомендовано</span>
      </span>
        )
    }

    return (
        <span className={cn("status-not-recommended inline-block px-2.5 py-1 border rounded-full text-xs", className)}>
      Не рекомендовано
    </span>
    )
}
