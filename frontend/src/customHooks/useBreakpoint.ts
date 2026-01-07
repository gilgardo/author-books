import { useEffect, useState } from "react";

function useBreakpoint(breakpoint: number, lowBreakpoint?: number) {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (lowBreakpoint) {
          setIsBreakpoint(
            window.innerWidth >= lowBreakpoint &&
              window.innerWidth <= breakpoint
          );
        } else {
          setIsBreakpoint(window.innerWidth >= breakpoint);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, lowBreakpoint]);

  return isBreakpoint;
}

export default useBreakpoint;
