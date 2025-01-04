import { cn } from "@/lib/utils";
import SocialMedia from "./social-media";

type Props = {
  Component: string;
  id: string;
  className: string;
};

const AppWrap = ({ Component, id, className }: Props) =>
  function HOC() {
    return (
      <div id={id} className={cn("w-full min-h-dvh", className)}>
        <SocialMedia />
        <div>
          <Component />

          {/* Copyright if needed */}
        </div>
        {/* Navigation section */}
      </div>
    );
  };

export default AppWrap;
