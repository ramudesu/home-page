import React from "react";
import "./index.css";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import ScrollMouseDownGuide from "@/components/guides/scroll-mouse";

type Props = {};

const slides = [
  "https://fastcdn.hoyoverse.com/content-v2/plat/114197/c61d0f00b37fe3b531f45a31738dcb20_3118981155960834062.jpg",
  "https://fastcdn.hoyoverse.com/content-v2/plat/101527/e5c00181d342be1f49b4e0d404f8c893_3657194828083047846.jpeg",
];

const SHOWING_TIME = 5000;

const HeroVer1 = ({}: Props) => {
  const intervalRef = React.useRef<Timer | null>(null);
  const mainSlideRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [mounted, setMounted] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const triggerSlideAnimation = React.useCallback(
    (currentSlide: number, nextSlide: number, triggerByUser = false) => {
      // Slide animation
      const currentSlideRef = mainSlideRefs.current[currentSlide];
      const nextSlideRef = mainSlideRefs.current[nextSlide];

      if (currentSlideRef && nextSlideRef) {
        // The selected slide is in the left side of the current slide
        if (!triggerByUser) {
          gsap.fromTo(
            currentSlideRef,
            {
              opacity: 1,
              x: 0,
            },
            {
              opacity: 1,
              x: "-100%",
              duration: 0.6,
              onComplete: () => {
                gsap.set(currentSlideRef, { opacity: 0 });
              },
            },
          );
          gsap.fromTo(
            nextSlideRef,
            {
              opacity: 1,
              x: "100%",
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              onComplete: () => {
                gsap.set(nextSlideRef, { opacity: 1 });
              },
            },
          );
        } else {
          if (nextSlide < currentSlide) {
            gsap.fromTo(
              nextSlideRef,
              {
                opacity: 1,
                x: "-100%",
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                onComplete: () => {
                  gsap.set(nextSlideRef, { opacity: 1 });
                },
              },
            );
            gsap.fromTo(
              currentSlideRef,
              {
                opacity: 1,
                x: 0,
              },
              {
                opacity: 1,
                x: "100%",
                duration: 0.6,
                onComplete: () => {
                  gsap.set(currentSlideRef, { opacity: 0 });
                },
              },
            );
          } else {
            gsap.fromTo(
              currentSlideRef,
              {
                opacity: 1,
                x: 0,
              },
              {
                opacity: 1,
                x: "-100%",
                duration: 0.6,
                onComplete: () => {
                  gsap.set(currentSlideRef, { opacity: 0 });
                },
              },
            );
            gsap.fromTo(
              nextSlideRef,
              {
                opacity: 1,
                x: "100%",
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                onComplete: () => {
                  gsap.set(nextSlideRef, { opacity: 1 });
                },
              },
            );
          }
        }
      }
    },
    [],
  );

  const startInterval = React.useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        triggerSlideAnimation(prev, (prev + 1) % slides.length);

        return (prev + 1) % slides.length;
      });
    }, SHOWING_TIME);
  }, []);

  React.useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleClickMiniSlide = React.useCallback(
    (slide: number) => {
      setCurrentSlide(slide);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      startInterval();

      triggerSlideAnimation(currentSlide, slide, true);
    },
    [currentSlide],
  );

  return (
    <div className="w-full h-screen relative">
      {/* Main Slides */}
      <div className="w-full h-full bg-black/65 relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (mainSlideRefs.current[index] = el)}
            className={cn(
              "absolute top-0 left-0 w-full h-full opacity-0",
              currentSlide === index && "opacity-1",
            )}
          >
            <img
              className={cn("w-full h-full object-cover")}
              src={slide}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Mini Slides */}
      <div className="absolute bottom-3 right-10 flex items-center w-5/12 justify-end gap-2">
        {slides.map((slide, index) => (
          <div
            onClick={() => {
              if (currentSlide !== index) handleClickMiniSlide(index);
            }}
            className={cn(
              "mini-slide-wrapper",
              index === currentSlide && mounted && "mini-slide-wrapper--active",
            )}
            key={index}
          >
            <div
              className={cn(
                "w-full h-0 pb-[56.25%] rounded-sm relative cursor-pointer overflow-hidden hover:after:opacity-0",
                currentSlide !== index && "mini-slide-wrapper-img",
              )}
            >
              <img
                src={slide}
                loading="lazy"
                className="block absolute w-full h-full object-cover"
              />
            </div>
            <div className="mini-slide-img-indicator" />
          </div>
        ))}
      </div>

      <ScrollMouseDownGuide />
    </div>
  );
};

export default HeroVer1;
