import ScrollMouseDownGuide from "../guides/scroll-mouse";
import { motion } from "framer-motion";
import React from "react";

const parentVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 5, 0],
    transition: {
      duration: 0.5,
      // type: "spring",
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 3,
      // delay: 0,
    },
  },
};

const GlobalScrollDown = (Component: React.FC, color: "black" | "white") =>
  function HOC() {
    return (
      <React.Fragment>
        <Component />
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full pointer-events-none select-none">
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="animate"
            className="font-bold pt-5"
          >
            {["し", "た", "に", "ス"].map((char, i) => (
              <motion.span
                variants={childVariants}
                style={{ display: "inline-block" }}
                key={i}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <ScrollMouseDownGuide
            className="relative top-0 left-0"
            lineClassName={`after:bg-${color} w-[0.065rem] h-[2.5rem] !important`}
            iconClassName={`text-${color} w-6 h-6`}
            hideOnScroll={false}
          />
          <motion.div
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
            initial="initial"
            animate="animate"
            className="font-bold pt-5"
          >
            {["ク", "ロ", "ー", "ル"].map((char, i) => (
              <motion.span
                variants={childVariants}
                style={{ display: "inline-block" }}
                key={i}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </React.Fragment>
    );
  };

export default GlobalScrollDown;
