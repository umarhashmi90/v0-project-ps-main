"use client"

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

const RadioGroupCards = React.forwardRef<
    React.ElementRef<typeof RadioGroup>,
    React.ComponentPropsWithoutRef<typeof RadioGroup>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroup
            ref={ref}
            className={cn("grid gap-2", className)}
            {...props}
        />
    )
})
RadioGroupCards.displayName = "RadioGroupCards"

const RadioCard = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label> & { value: string, price: string }
>(({ className, value, children, price, ...props }, ref) => {
    return (
        <Label
            ref={ref}
            htmlFor={value}
            className={cn(
                "flex items-center justify-between rounded-md border-2 border-gray-200 bg-white p-3 hover:border-primary cursor-pointer transition-all",
                "has-[input:checked]:border-primary has-[input:checked]:bg-primary/5 has-[input:checked]:shadow-sm",
                className
            )}
            {...props}
        >
            <div className="flex items-center">
                <RadioGroupItem value={value} id={value} className="sr-only" />
                <span className="h-5 w-5 flex items-center justify-center rounded-full border border-gray-300 mr-3 transition-all radio-indicator">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent"></span>
                </span>
                <span className="font-medium text-sm text-gray-800">{children}</span>
            </div>
            <span className="font-semibold text-sm text-gray-900">{price}</span>
            <style jsx>{`
                input[type="radio"]:checked + .radio-indicator {
                    border-color: hsl(var(--primary));
                    background-color: hsl(var(--primary));
                }
                input[type="radio"]:checked + .radio-indicator > span {
                    background-color: white;
                }
            `}</style>
        </Label>
    )
})
RadioCard.displayName = "RadioCard"

export { RadioGroupCards, RadioCard }
