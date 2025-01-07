import { videos } from "@/constants";
import useLazyLoadingVideo from "@/hooks/use-lazy-loading-video";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMounted } from "usehooks-ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const HeroVer3 = ({}: Props) => {
  const isMounted = useIsMounted();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { videoRef, src: mv } = useLazyLoadingVideo(videos.bg_mv);

  useGSAP(
    () => {
      if (!isMounted) return;
      if (!containerRef.current || !videoRef.current) return;

      const viewportHeight = window.innerHeight;

      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => "+=" + viewportHeight * 2,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          requestAnimationFrame(() => {
            if (videoRef.current) {
              videoRef.current.currentTime =
                progress * Math.round(videoRef.current.duration);
            }
          });
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { dependencies: [isMounted] },
  );

  return (
    <div ref={containerRef} className="w-full h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          ref={videoRef}
          src={mv}
          autoPlay={false}
          muted
          loop={false}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroVer3;
