import { images, videos } from "@/constants";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import useMousePosition from "./hooks/use-mouse-position";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const MvBackground = ({}: Props) => {
  const bgMvRef = React.useRef<HTMLDivElement>(null);
  const firstContentRef = React.useRef<HTMLDivElement>(null);
  const kumaImgRef = React.useRef<HTMLImageElement>(null);
  const kumaImgContainerRef = React.useRef<HTMLDivElement>(null);

  const mousePosition = useMousePosition(bgMvRef);

  useGSAP(() => {
    // const viewportHeight = window.innerHeight;
    gsap.fromTo(
      firstContentRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: bgMvRef.current,
          pin: true,
          // scrub: true,
          pinSpacing: false,
          // markers: true,
          start: `bottom bottom`,
          toggleActions: "restart pause resume pause",
          invalidateOnRefresh: true,
        },
      },
    );
  }, []);

  const kumaImg = React.useMemo(() => {
    switch (mousePosition) {
      case "TOP":
        return images.power_up;
      case "MIDDLE":
        return images.power_middle;
      case "BOTTOM":
        return images.power_down;
      default:
        return images.power_middle;
    }
  }, [mousePosition]);

  const handleClickKumaImage = React.useCallback(() => {
    gsap.to(kumaImgRef.current, {
      keyframes: {
        scaleX: [1.2, 0.9, 1.1, 0.95, 1],
        scaleY: [0.8, 1.1, 0.9, 1.05, 1],
      },
    });
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div
        ref={bgMvRef}
        className="w-full h-full absolute top-0 left-0 -z-1 overflow-hidden"
      >
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover overflow-clip"
          src={videos.bg_mv}
          autoPlay
          loop
          muted
        />
      </div>
      <div className="z-2 w-full h-full p-10 absolute top-0 left-0">
        <div className="flex h-full w-full">
          <div className="basis-1/2 py-10 px-20">
            <div
              ref={kumaImgContainerRef}
              className="w-full h-full flex flex-col gap-10 items-center justify-center rounded-xl bg-white/45 backdrop-blur-lg border border-white/65 relative"
            >
              <div className="absolute w-full h-full p-1 z-0">
                <div className="w-full h-full border border-white/20 rounded-lg" />
              </div>
              <div
                className="basis-2/3 h-2/3 z-10"
                onClick={handleClickKumaImage}
              >
                <img
                  ref={kumaImgRef}
                  loading="lazy"
                  src={kumaImg}
                  className="h-full object-cover"
                  style={{
                    transformOrigin: "center bottom",
                  }}
                  alt=""
                />
              </div>
              <p className="z-1 font-bold text-4xl text-center w-4/5 text-black/85 basis-1/3 h-1/3">
                日本語が下手です。でも、頑張ります！
              </p>
            </div>
          </div>
          <div className="basis-1/2">
            <div
              ref={firstContentRef}
              className="w-full h-full bg-pink-500 relative opacity-0"
            >
              <div className="absolute -right-[4rem] -top-[2rem]">
                <img src={images.shirokuma_03} className="w-[20rem]" />
              </div>
              <div className="grid grid-cols-5 w-full">
                <div className="col-span-2 border-b-[1.2rem] border-b-white">
                  <h2 className="pl-3 text-[12rem] leading-none text-white font-bold">
                    01
                  </h2>
                </div>
                <div className="col-span-3 pt-5">
                  <h3 className="font-bold text-[4rem] text-black/85 leading-normal">
                    革命
                  </h3>
                </div>
              </div>
              <div className="mt-2.5 px-5 w-full">
                <h2 className="text-[4.5rem] text-white/85 font-extrabold">
                  安いの電池の費用
                </h2>
              </div>
              {/* TODO: Adjust the position of the button later */}
              <button className="absolute left-5 bottom-8 bg-black/85 flex items-center gap-x-3.5 cursor-pointer p-0 rounded-full group hover:border-b-4 hover:border-b-white overflow-hidden">
                <div className="group-hover:scale-0 transiton duration-500 ml-[0.6rem] h-[2.8rem] aspect-square rounded-full bg-white flex items-center justify-center">
                  <Play className="w-3/5 h-3/5 text-black/85" />
                </div>
                <p className="py-[0.4rem] pr-[1.6rem] font-bold text-[2rem] text-white/85 group-hover:translate-x-full transition duration-500">
                  詳しく見る
                </p>
                <div className="flex items-center justify-center -translate-x-full group-hover:translate-x-0 transition duration-500 absolute inset-0 text-[2rem]">
                  🚀
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvBackground;
