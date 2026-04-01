//Copied from pizzaria-delivery-1-9

"use client"

// need to install react-spinners for this component to work
// with docker - must shut down, clear volumes, and rebuild / spinup all containers
import PuffLoader from 'react-spinners/PuffLoader';

/**
 * Props interface for the LoadingOverlay component
 * 
 * @interface LoadingOverlayProps
 * @property {boolean} [show=true] - Whether to display the overlay
 * @property {boolean} [showSpinner=true] - Whether to display the loading spinner
 * @property {string} [spinnerColor="#FFFFFF"] - Color of the loading spinner (hex or CSS color)
 * @property {string} [bgColor="#000000"] - Background color of the overlay (hex, CSS color, or rgba)
 */
interface LoadingOverlayProps {
    show?: boolean;
    showSpinner?: boolean;
    spinnerColor?: string;
    bgColor?: string;
}

/**
 * A full-screen loading overlay component with an optional spinner
 * 
 * Displays a semi-transparent overlay that covers the entire viewport,
 * typically used to block user interaction during async operations.
 * 
 * @component
 * @param props - Component props
 * @param props.show - Whether the overlay is visible (default: true)
 * @param props.bgColor - Background color of the overlay (default: "#000000")
 * @param props.spinnerColor - Color of the spinner (default: "#FFFFFF")
 * @param props.showSpinner - Whether to show the animated spinner (default: true)
 * 
 * @returns JSX element containing the loading overlay or empty div if not shown
 * 
 * @example
 * ```tsx
 * <LoadingOverlay 
 *   show={isLoading}
 *   spinnerColor="#3B82F6"
 *   bgColor="rgba(0, 0, 0, 0.5)"
 * />
 * ```
 */
export default function LoadingOverlay({ show = true, bgColor = "#000000", spinnerColor = "#FFFFFF", showSpinner = true }: LoadingOverlayProps) {
    return (
        (show)
            ?
            <div className="flex justify-center items-center fixed z-50 inset-0 w-full h-full" style={{ backgroundColor: bgColor }}>
                {(showSpinner) ?
                    <PuffLoader
                        color={spinnerColor}
                        size={50} />
                    : <div></div>}
            </div>
            : <div></div>
    );
}