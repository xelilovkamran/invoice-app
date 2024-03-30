import Rectangle from "@/assets/Rectangle.svg?react";
import Moon from "@/assets/icon-moon.svg?react";
import Sun from "@/assets/icon-sun.svg?react";
import Logo from "@/assets/logo.svg?react";
import profilePicture from "@/assets/profile-picture.jpg";
import ThemeContext from "@/context/theme/ThemeContext";
import UserContext from "@/context/user/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SideBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { avatarURL } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState("");

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setImageUrl(avatarURL);
  }, [avatarURL]);

  return (
    <div
      className={`select-none w-24 h-screen ${
        theme === "light" ? "bg-[#373B53]" : "bg-[#1E2139]"
      }  rounded-r-3xl flex justify-between flex-col z-[100]`}
    >
      <Link to={"/"}>
        <Rectangle className="text-red-500">
          <Logo />
        </Rectangle>
      </Link>
      <div className="flex flex-col justify-center items-center gap-8">
        {theme === "light" ? (
          <Moon className="cursor-pointer" onClick={onClick} />
        ) : (
          <Sun className="cursor-pointer" onClick={onClick} />
        )}

        <div className="py-8 w-full border-t-[1px] border-t-[#494E6E] flex justify-center">
          <img
            src={imageUrl ? imageUrl : profilePicture}
            alt="avatar"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
