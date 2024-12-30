import { videos } from "@/constants";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MvBackground from "./mv";
import { useIsMounted } from "usehooks-ts";
import { TextHoverEffect } from "@/components/aceternity-ui/text-hover-effect";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const ParallaxVer1 = ({}: Props) => {
  const isMounted = useIsMounted();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const morningRef = React.useRef<HTMLDivElement>(null);
  const nightRef = React.useRef<HTMLDivElement>(null);
  const nightRgbTextRef = React.useRef<HTMLDivElement>(null);
  const morningRgbTextRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isMounted) return;

    const viewportHeight = window.innerHeight;
    const tl = gsap.timeline();
    tl.fromTo(
      nightRgbTextRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 3 },
    )
      .from(morningRef.current, { xPercent: 100, duration: 3 })
      .fromTo(
        morningRgbTextRef.current,
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 3 },
      );

    ScrollTrigger.create({
      animation: tl,
      trigger: containerRef.current,
      start: "bottom bottom",
      end: () => "+=" + viewportHeight * 3,
      scrub: 1,
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
            className="w-full h-full object-cover overflow-clip"
            src={videos.night}
            autoPlay
            loop
            muted
          />
        </div>
        <div ref={nightRgbTextRef} className="absolute top-10 left-8">
          <TextHoverEffect
            text={"夜から"}
            scale={2.5}
            // textClassName="fill-black/15"
          />
        </div>
        <div
          ref={morningRef}
          className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden"
        >
          <video
            className="w-full h-full object-cover overflow-clip"
            src={videos.morning}
            autoPlay
            loop
            muted
          />
        </div>
        <div ref={morningRgbTextRef} className="absolute right-8 bottom-0">
          <TextHoverEffect
            text={"朝まで"}
            scale={2.5}
            textClassName="fill-black/15"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ParallaxVer1;
