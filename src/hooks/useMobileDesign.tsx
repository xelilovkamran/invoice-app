import { useEffect, useState } from "react";

function useMobileDesign(breakPoint: number) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < breakPoint) {
            setIsMobile(true);
        }
    }, [breakPoint]);

    window.addEventListener("resize", (e) => {
        const target = e.target as Window;
        setIsMobile(target?.innerWidth < breakPoint ? true : false);
    });

    return { isMobile };
}

export default useMobileDesign;
