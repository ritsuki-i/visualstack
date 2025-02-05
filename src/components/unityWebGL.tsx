import { useState, useEffect, useRef } from "react"
import LoadingOverlay from "./LoadingOverlay"

interface UnityWebGLProps {
    onStart: () => void
    onLoaded: () => void
    className?: string
}

export default function UnityWebGL({ onStart, onLoaded, className = "" }: UnityWebGLProps) {
    const [isLoading, setIsLoading] = useState(false)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    return (
        <div className={`relative w-full h-full ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <LoadingOverlay/>
                </div>
            )}
            <iframe
                ref={iframeRef}
                src="/Visual_Stack_webGL/index.html"
                className="w-full h-full border-none"
                title="Unity WebGL Game"
            />
        </div>
    )
}

