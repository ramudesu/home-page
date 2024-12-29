import { videos } from "@/constants";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {};

const ParallaxVer1 = (props: Props) => {
  const bgMvRef = React.useRef<HTMLDivElement>(null);
  const morningRef = React.useRef<HTMLDivElement>(null);
  const nightRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {});

  return (
    <React.Fragment>
      <div className="w-full h-screen relative">
        <div className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover overflow-clip"
            src={videos.bg_mv}
            autoPlay
            loop
            muted
          />
        </div>
        <div className=""></div>
      </div>
      <div className="w-full h-screen relative">
        <div className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover overflow-clip"
            src={videos.night}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
      <div className="w-full h-screen relative">
        <div className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover overflow-clip"
            src={videos.morning}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ParallaxVer1;
