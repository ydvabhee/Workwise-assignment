
import {CircularProgress, cn} from "@nextui-org/react";
interface PropsWithChildren {
  isLoading: boolean | undefined
  children: React.ReactNode
}
/**
 * A utility component that renders a full-screen loading
 * indicator if the "isLoading" prop is true.
 * @param {boolean} [isLoading=true] Whether to show the loading indicator
 * @param {React.ReactNode} children The content to be rendered when the loading indicator is not shown
 * @returns 
 */
export const Loading = ({children, isLoading = true } : PropsWithChildren) => {

  return (
    <>
      {isLoading && <div style={{'zIndex': 9999, 'backgroundColor': 'rgba(0,0,0,0.8)'}} className="select-none absolute  h-full w-full flex items-center justify-center ">
    <div className="flex items-center">
     <CircularProgress size="lg" label="Loading..." />
    </div>
  </div>}
      {children}
    </>
  )
}