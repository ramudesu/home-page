import { videos } from "@/constants";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MvBackground from "./mv";
import { useIsMounted } from "usehooks-ts";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const ParallaxVer1 = ({}: Props) => {
  const isMounted = useIsMounted();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const morningRef = React.useRef<HTMLDivElement>(null);
  const nightRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isMounted) return;

    const viewportHeight = window.innerHeight;
    const tl = gsap.timeline();
    tl.from(morningRef.current, { xPercent: 100, duration: 5 });

    ScrollTrigger.create({
      animation: tl,
      trigger: containerRef.current,
      start: "top top",
      end: () => "+=" + viewportHeight * 2,
      scrub: true,
      pin: true,
      // anticipatePin: 1,
    });
  }, [isMounted]);

  return (
    <React.Fragment>
      <MvBackground />
      <div ref={containerRef} className="w-full h-screen relative">
        <div
          ref={nightRef}
          className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden"
        >
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover overflow-clip"
            src={videos.night}
            autoPlay
            loop
            muted
          />
        </div>
        <div
          ref={morningRef}
          className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden"
        >
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
