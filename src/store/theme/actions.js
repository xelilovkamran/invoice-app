import { themeActions } from "@/store/theme/index";
import { store } from "@/store/index";

export const setTheme = (theme) => store.dispatch(themeActions.setTheme(theme));
