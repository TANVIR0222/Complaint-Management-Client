import { useNavigate } from "react-router";
import useUser from "../Hooks/useUser";
import isAdmin from "../utils/isAdmin";

const AdminPermission = () => {
    const navigate = useNavigate();
    const { role } = useUser();

    useEffect(() => {
        if (role === 'ADMIN') {
            navigate('/admin');
        }
    }, [role, navigate]);

    return role === 'ADMIN';
};

export default AdminPermission;
