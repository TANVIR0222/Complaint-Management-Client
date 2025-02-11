import { useSelector } from "react-redux";
import { useFetchSingleUserQuery } from "../app/feature/userApi/userApi";

const useUser = () => {
    const id = useSelector((state) => state?.user?.id)
    
    const {data : user , error} = useFetchSingleUserQuery(id);
    const isRole = user?.data?.role    
    

    return [user , isRole , error]
};

export default useUser;