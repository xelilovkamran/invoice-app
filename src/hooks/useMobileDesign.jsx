import { useEffect, useState } from "react";

function useMobileDesign(breakPoint) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < breakPoint) {
      setIsMobile(true);
    }
  }, [breakPoint]);

  window.addEventListener("resize", (e) => {
    setIsMobile(e.target.innerWidth < breakPoint ? true : false);
  });

  return { isMobile };
}

export default useMobileDesign;
