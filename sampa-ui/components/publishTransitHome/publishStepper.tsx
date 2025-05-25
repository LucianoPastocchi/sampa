"use client"

import { CheckCircle } from "lucide-react"

interface PublishStepperProps {
  steps: string[]
  currentStep: number
}

export default function PublishStepper({ steps, currentStep }: PublishStepperProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
              index < currentStep
                ? "bg-green-100 text-green-600"
                : index === currentStep
                  ? "bg-rose-100 text-rose-600 ring-2 ring-rose-500 ring-offset-2"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {index < currentStep ? <CheckCircle size={16} /> : <span className="text-sm font-medium">{index + 1}</span>}
          </div>
          <span
            className={`text-sm ${
              index === currentStep
                ? "font-medium text-rose-600"
                : index < currentStep
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}
