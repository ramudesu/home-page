import { motion } from "framer-motion";
import React from "react";
import "./index.css";
import { cn } from "@/lib/utils";

type Props = {
  variants?: any;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  style?: any;
  children: React.ReactNode;
  id: string;
  rxPc?: number;
  rxMo?: number;
  remRatio?: number;
  strokeWidth?: number;
};

const HoverEffectButton = ({
  id,
  variants,
  className,
  style,
  onClick,
  children,
  textClassName,
  rxPc = 30,
  rxMo = 16,
  remRatio = 0.75,
  strokeWidth = 2,
}: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      id={id}
      variants={variants}
      className={cn("hover-effect-button-container", className)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={style}
      onClick={() => onClick && onClick()}
    >
      <div
        className="hover-effect-button-wrap"
        style={
          {
            "--rx-pc": rxPc,
            "--rx-mo": rxMo,
            "--rem-ratio": remRatio,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "hover-effect-button-fill-bg",
            isHovered && "opacity-0",
          )}
        />
        <svg className="hover-effect-button-svg-wrap">
          <rect
            rx={"23"}
            pathLength={"700"}
            className={cn(
              "hover-effect-button-rect",
              isHovered ? "visibility-visible" : "visibility-hidden",
              "stroke-hoyo-blue",
            )}
            strokeWidth={isHovered ? strokeWidth : 1}
            strokeDasharray={isHovered ? "100,0" : "0,100"}
            strokeDashoffset={isHovered ? "0" : "100"}
          />
        </svg>
        <div className={cn("hover-effect-button-desc", textClassName)}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default HoverEffectButton;
