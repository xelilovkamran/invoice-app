// import { useContext, useEffect, useState } from "react";
// import Rectangle from "../assets/Rectangle.svg?react";
// import Moon from "../assets/icon-moon.svg?react";
// import Sun from "../assets/icon-sun.svg?react";
// import Logo from "../assets/logo.svg?react";
// import ThemeContext from "../context/theme/ThemeContext";

// function SideBar() {
//   const { theme, setTheme } = useContext(ThemeContext);
//   const [imageUrl, setImageUrl] = useState("");

//   const onClick = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("user info"));
//     setImageUrl(userInfo.avatar);
//   }, []);

//   return (
//     <div
//       className={`select-none w-24 absolute top-0 left-0 h-screen ${
//         theme === "light" ? "bg-[#373B53]" : "bg-[#1E2139]"
//       }  rounded-r-3xl flex justify-between flex-col`}
//     >
//       <Rectangle className="text-red-500">
//         <Logo />
//       </Rectangle>
//       <div className="flex flex-col justify-center items-center gap-8">
//         {theme === "light" ? (
//           <Moon className="cursor-pointer" onClick={onClick} />
//         ) : (
//           <Sun className="cursor-pointer" onClick={onClick} />
//         )}

//         <div className="py-8 w-full border-t-[1px] border-t-[#494E6E] flex justify-center">
//           <img src={imageUrl} alt="avatar" className="rounded-full w-10 h-10" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideBar;

import { useContext, useEffect, useState } from "react";
import Rectangle from "../assets/Rectangle.svg?react";
import Moon from "../assets/icon-moon.svg?react";
import Sun from "../assets/icon-sun.svg?react";
import Logo from "../assets/logo.svg?react";
import ThemeContext from "../context/theme/ThemeContext";

function SideBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [imageUrl, setImageUrl] = useState("");

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user info"));
    setImageUrl(userInfo.avatar);
  }, []);

  return (
    <div
      className={`select-none w-24 h-screen ${
        theme === "light" ? "bg-[#373B53]" : "bg-[#1E2139]"
      }  rounded-r-3xl flex justify-between flex-col`}
    >
      <Rectangle className="text-red-500">
        <Logo />
      </Rectangle>
      <div className="flex flex-col justify-center items-center gap-8">
        {theme === "light" ? (
          <Moon className="cursor-pointer" onClick={onClick} />
        ) : (
          <Sun className="cursor-pointer" onClick={onClick} />
        )}

        <div className="py-8 w-full border-t-[1px] border-t-[#494E6E] flex justify-center">
          <img src={imageUrl} alt="avatar" className="rounded-full w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
