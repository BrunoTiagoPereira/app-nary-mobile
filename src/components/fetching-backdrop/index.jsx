import Backdrop from "../backdrop/Backdrop";
import {useIsFetching, useIsMutating} from 'react-query'

const FetchingBackdrop = () => {
    const isFetching = useIsFetching() == 1;
    const isMutation = useIsMutating() == 1;
    return <Backdrop isVisible={isMutation || isFetching}/>;
}
 
export default FetchingBackdrop;