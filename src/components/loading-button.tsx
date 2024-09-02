import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"

export default function LoadingButton({isLoading, children, loadingText} : {isLoading: boolean, children: React.ReactNode, loadingText: string}) {
    return (        
    <Button disabled={isLoading} type="submit">
        {isLoading && <Spinner size="sm"/>}
        {isLoading ? loadingText : children}
    </Button>
    );
}
