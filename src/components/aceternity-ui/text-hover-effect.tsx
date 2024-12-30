import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  scale = 3,
  strokeWidth = 1, // Add strokeWidth prop with a default value
  textClassName,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  scale?: number;
  strokeWidth?: number; // Add strokeWidth prop type
  textClassName?: string; // Add className prop type
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setSvgDimensions({ width: bbox.width, height: bbox.height });
    }
  }, [text]);

  return (
    <svg
      ref={svgRef}
      width={svgDimensions.width * scale}
      height={svgDimensions.height * scale}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient
          id={`textGradient-${text}`}
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={"var(--yellow-500)"} />
              <stop offset="25%" stopColor={"var(--red-500)"} />
              <stop offset="50%" stopColor={"var(--blue-500)"} />
              <stop offset="75%" stopColor={"var(--cyan-500)"} />
              <stop offset="100%" stopColor={"var(--violet-500)"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={`revealMask-${text}`}
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`textMask-${text}`}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#revealMask-${text})`}
          />
        </mask>
      </defs>
      <text
        ref={textRef}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth} // Use the strokeWidth prop
        className={cn(
          "font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl",
          textClassName,
        )}
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth} // Use the strokeWidth prop
        className={cn(
          "font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200 dark:stroke-neutral-800",
          textClassName,
        )}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#textGradient-${text})`}
        strokeWidth={strokeWidth} // Use the strokeWidth prop
        mask={`url(#textMask-${text})`}
        className={cn(
          "font-[helvetica] font-bold fill-transparent text-7xl",
          textClassName,
        )}
      >
        {text}
      </text>
    </svg>
  );
};

export default TextHoverEffect;
