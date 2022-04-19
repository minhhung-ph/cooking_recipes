import { useContext } from "react"
import { UpdateContext } from "../context/UpdateContext";

const useUpdate = () => {
    const context = useContext(UpdateContext);
    if(context===undefined) {
        throw new Error('useUpdate must be used inside UpdateProvider');
    }
    return context;
}

export default useUpdate;