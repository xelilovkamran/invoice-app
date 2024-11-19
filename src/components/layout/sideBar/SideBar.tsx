import { Link } from "react-router-dom";

import Moon from "@/assets/icon-moon.svg?react";
import Sun from "@/assets/icon-sun.svg?react";
import Logo from "@/assets/logo.svg?react";
import Rectangle from "@/assets/Rectangle.svg?react";
import { useThemeActions } from "@/store/theme/actions";
import { useTheme } from "@/store/theme/hooks";
import { useUser } from "@/store/user/hooks";

function SideBar() {
  const { theme } = useTheme();
  const { avatar } = useUser();
  const { setTheme } = useThemeActions();

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
    const root = window.document.documentElement;
    root.classList.toggle("dark");
  };

  return (
    <div
      className={`select-none tablet:w-24 tablet:h-screen w-full max-tablet:pr-8 tablet:rounded-r-3xl flex justify-between tablet:flex-col flex-row z-[3] bg-[#373B53] dark:bg-[#1E2139]`}
    >
      <Link to={"/"}>
        <Rectangle className="text-red-500">
          <Logo />
        </Rectangle>
      </Link>
      <div className="flex tablet:flex-col flex-row justify-center items-center gap-8">
        {theme === "light" ? (
          <Moon className="cursor-pointer" onClick={onClick} />
        ) : (
          <Sun className="cursor-pointer" onClick={onClick} />
        )}

        <div className="tablet:py-8 tablet:w-full max-tablet:h-full max-tablet:pl-8  tablet:border-t-[1px] border-l-[1px] border-[#494E6E] flex justify-center items-center">
          <img src={avatar} alt="avatar" className="rounded-full w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
