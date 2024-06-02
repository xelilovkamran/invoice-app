import { type RootState } from "@/store/index";
import { useSelector } from "react-redux";

const useAppSelector = useSelector.withTypes<RootState>();

export const useTheme = () => useAppSelector((state) => state.theme);
