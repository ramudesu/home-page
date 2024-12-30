import { useEffect, useState } from "react";

const useMousePosition = (bgMvRef: React.RefObject<HTMLDivElement>) => {
  const [position, setPosition] = useState<"TOP" | "MIDDLE" | "BOTTOM" | null>(
    null,
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const screenHeight = window.innerHeight;
      const y = event.clientY;

      if (y < screenHeight / 3) {
        setPosition("TOP");
      } else if (y < (2 * screenHeight) / 3) {
        setPosition("MIDDLE");
      } else {
        setPosition("BOTTOM");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("mousemove", handleMouseMove);
          } else {
            window.removeEventListener("mousemove", handleMouseMove);
            setPosition(null);
          }
        });
      },
      { threshold: 1.0 },
    );

    if (bgMvRef.current) {
      observer.observe(bgMvRef.current);
    }

    return () => {
      if (bgMvRef.current) {
        observer.unobserve(bgMvRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [bgMvRef]);

  return position;
};

export default useMousePosition;
