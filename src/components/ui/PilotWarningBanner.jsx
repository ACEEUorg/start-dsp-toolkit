import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function PilotWarningBanner() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start justify-between">
            <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                    <span className="font-medium">Pilot Version:</span> This is a pilot version of the toolbox. Please do not share as the URL is subject to change. To learn when the official toolbox is released, please follow Start DSP on LinkedIn: {' '}
                    <a 
                        href="https://www.linkedin.com/company/start-dsp/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-seafoam-600 hover:text-seafoam-800 underline font-medium"
                    >
                        https://www.linkedin.com/company/start-dsp/
                    </a>
                </p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="ml-4 text-gray-400 hover:text-gray-500"
                aria-label="Dismiss warning"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}