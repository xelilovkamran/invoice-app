import { type AppDispatch } from "@/store/index";
import { userActions } from "@/store/user/index";
import { type TUserData } from "@/types/types";
import { useDispatch } from "react-redux";
import { getUserData } from "@/store/user/index";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const setUserData = (userData: TUserData) =>
        dispatch(userActions.setUserData(userData));

    const addInvoiceID = (invoiceID: string) =>
        dispatch(userActions.addInvoiceID(invoiceID));

    const getUserDataAction = (userID: string) => dispatch(getUserData(userID));

    return { setUserData, addInvoiceID, getUserDataAction };
};
