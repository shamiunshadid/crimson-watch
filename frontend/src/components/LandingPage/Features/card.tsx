import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type CardProps = {
    children: ReactNode;
    className?: string;
}

// type BaseCardProps = {
//     children: ReactNode;
//     className?: string;
// }

export const Card = ({children, className}: CardProps) => {
    return (
        <div className={cn("p-2 md:p-4 rounded-lg border border-transparent shadow-sm ring-1 ring-transparent hover:ring-black/10 hover:shadow-black/10 shadow-transparent transition-all duration-200 ease-in-out m-5", className)}>
            {children}
        </div>
    )
}


export const CardTitle = ({children, className}: CardProps) => {
    return (
        <h2 className={cn("text-xl font-semibold text-neutral-900 text-shadow-sm text-shadow-black/5", className)}>{children}</h2>
    )
}

export const CardDescription = ({children, className}: CardProps) => {
    return (
        <p className={cn("mt-2 text-sm text-neutral-500", className)}>{children}</p>
    )
}


export const CardSkeleton = ({children, className}: CardProps) => {
    return (
        <div className={cn("w-full h-80 rounded-lg bg-neutral-100", className)}>{children}</div>
    )
}