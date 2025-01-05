// import { Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
import { Html, useProgress } from "@react-three/drei";
import CircularProgress from "../progress/circular-progress";
type Props = {};

// const parentVariants = {
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const childVariants = {
//   initial: { y: 0 },
//   animate: {
//     y: [0, -5, 0],
//     color: ["rgb(0 0 0 / 0.85)", "#4d6eff", "rgb(0 0 0 / 0.85)"],
//     transition: {
//       duration: 0.5,
//       ease: "linear",
//       repeat: Infinity,
//       repeatType: "loop" as const,
//       repeatDelay: 3,
//     },
//   },
// };

const CanvasLoader = ({}: Props) => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress progress={progress} />
      {/* <div className="flex flex-col items-center justfy-center gap-2.5">
        <Loader2 className="w-10 h-10 animate-spin text-black/85" />
        <motion.div
          variants={parentVariants}
          initial="initial"
          animate="animate"
          className="text-black/85 text-base font-medium"
        >
          {["L", "o", "a", "d", "i", "n", "g", ".", ".", "."].map((char, i) => (
            <motion.span
              variants={childVariants}
              style={{ display: "inline-block" }}
              key={i}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <div className="inline-block">{progress.toFixed(2)}%</div>
      </div> */}
    </Html>
  );
};

export default CanvasLoader;
