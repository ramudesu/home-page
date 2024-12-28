import React, { useCallback } from "react";
import "./index.css";
import { cn } from "@/lib/utils";
import { Mouse } from "lucide-react";

type Props = {
  className?: string;
};

const ScrollMouseDownGuide = ({ className }: Props) => {
  const [scrolled, setScrolled] = React.useState(false);

  const scrollEvent = useCallback(() => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [scrolled]);

  React.useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

  return (
    <div className={cn("mouse-scroll", scrolled && "scrolled", className)}>
      <div>
        <Mouse className="w-4 h-4 text-white" />
      </div>
      <div className="mouse-scroll-line" />
    </div>
  );
};

export default ScrollMouseDownGuide;
