import React, { useCallback } from "react";
import "./index.css";
import { cn } from "@/lib/utils";
import { Mouse } from "lucide-react";

type Props = {
  className?: string;
  iconClassName?: string;
  lineClassName?: string;
  hideOnScroll?: boolean;
};

const ScrollMouseDownGuide = ({
  className,
  iconClassName,
  lineClassName,
  hideOnScroll = true,
}: Props) => {
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
    <div
      className={cn(
        "mouse-scroll absolute bottom-[0.75rem] right-[0.8rem]",
        hideOnScroll && scrolled && "scrolled",
        className,
      )}
    >
      <div>
        <Mouse className={cn("w-4 h-4 text-white", iconClassName)} />
      </div>
      <div
        className={cn(
          "mouse-scroll-line w-[0.05rem] h-[3.75rem] after:bg-black",
          lineClassName,
        )}
      />
    </div>
  );
};

export default ScrollMouseDownGuide;
