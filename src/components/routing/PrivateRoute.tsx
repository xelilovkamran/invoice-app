import Loading from "@/components/shared/loading/Loading";
import { useInvoiceActions } from "@/store/invoice/actions";
import { useUserActions } from "@/store/user/actions";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const [userID, setUserID] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { setUserData } = useUserActions();
    const { getInvoicesAction } = useInvoiceActions();

    useEffect(() => {
        const fetchUser = async () => {
            const userID = getCookie("uuid");

            if (!userID) {
                setLoading(false);
                return;
            }
            setUserID(userID);

            const availableUsers = await fetch(
                `http://localhost:3005/users?id=${userID}`
            ).then((res) => res.json());

            const user = availableUsers[0];
            delete user.password;
            delete user.id;

            await getInvoicesAction(user.invoiceIDs);

            setUserData(user);
            setLoading(false);
        };

        fetchUser();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <>{!userID ? <Navigate to="/sign-in" /> : <Outlet />}</>;
}

export default PrivateRoute;
