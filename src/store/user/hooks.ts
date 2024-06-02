import { useSelector } from "react-redux";
import { type RootState } from "@/store/index";

const useAppSelector = useSelector.withTypes<RootState>();

export const useUser = () => useAppSelector((state) => state.user);
