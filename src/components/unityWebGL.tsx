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

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log("Received message from Unity:", event.data)

            // Check if the message is a string and includes "unityLoaded"
            if (typeof event.data === "string" && event.data.includes("unityLoaded")) {
                console.log("Unity has finished loading")
                setIsLoading(false)
                onStart()
                onLoaded()
            }
        }

        console.log("Adding event listener for Unity messages")
        window.addEventListener("message", handleMessage)

        return () => {
            console.log("Removing event listener for Unity messages")
            window.removeEventListener("message", handleMessage)
        }
    }, [onLoaded])

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

