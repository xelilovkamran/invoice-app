import { type AppDispatch } from "@/store/index";
import { themeActions } from "@/store/theme/index";
import { type TTheme } from "@/types/types";
import { useDispatch } from "react-redux";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useThemeActions = () => {
    const dispatch = useAppDispatch();
    const setTheme = (theme: TTheme) => dispatch(themeActions.setTheme(theme));

    return { setTheme };
};
