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
  const nightRgbTextRef = React.useRef<SVGSVGElement>(null);
  const morningRgbTextRef = React.useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!isMounted) return;

    const viewportHeight = window.innerHeight;
    const tl = gsap.timeline();
    tl.fromTo(
      nightRgbTextRef.current,
      {
        strokeDashoffset: 1000,
        strokeDasharray: 1000,
        // opacity: 0,
        //  y: 25
      },
      {
        strokeDashoffset: 0,
        // opacity: 1,
        // y: 0,
      },
    )
      .from(morningRef.current, { xPercent: 100 })
      .fromTo(
        morningRgbTextRef.current,
        {
          strokeDashoffset: 1000,
          // opacity: 0,
          //  y: -25,
          strokeDasharray: 1000,
        },
        {
          strokeDashoffset: 0,
          //  opacity: 1,
          //  y: 0,
        },
      );

    const scrollTriggerInstance = ScrollTrigger.create({
      animation: tl,
      trigger: containerRef.current,
      start: "bottom bottom",
      end: () => "+=" + viewportHeight * 3,
      scrub: 1,
      pin: true,
      // anticipatePin: 1,
    });

    // Clean up on unmount
    return () => {
      scrollTriggerInstance.kill();
      tl.kill();
    };
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
        <div className="absolute top-10 left-8">
          <TextHoverEffect
            text={"夜から"}
            scale={2.5}
            motionTextTagRef={nightRgbTextRef}
            showHoverEffect={false}
            // textClassName="fill-black/45"
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
        <div className="absolute right-8 bottom-0">
          <TextHoverEffect
            text={"朝まで"}
            motionTextTagRef={morningRgbTextRef}
            scale={2.5}
            showHoverEffect={false}
            // textClassName="fill-black/45"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ParallaxVer1;
