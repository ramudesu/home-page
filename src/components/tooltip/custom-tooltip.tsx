import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  side?: "left" | "right" | "top" | "bottom";
  content: string | React.ReactNode;
  sideOffset?: number;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  alignOffset?: number;
};

const CustomTooltip = ({
  side = "top",
  content,
  sideOffset = 0,
  children,
  className,
  align = "center",
  alignOffset = 0,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className={cn("font-bold", className)}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
