import { useDispatch } from "react-redux";

import { type AppDispatch } from "@/store/index";
import { getUserData, userActions } from "@/store/user/index";
import { type TUserData } from "@/types/types";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const setUserData = (userData: TUserData) =>
    dispatch(userActions.setUserData(userData));

  const getUserDataAction = () => dispatch(getUserData());

  return { setUserData, getUserDataAction };
};
