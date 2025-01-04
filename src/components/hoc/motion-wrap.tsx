import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  Component: string;
  className?: string;
};

const MotionWrap = ({ Component, className }: Props) => {
  return (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{
        duration: 0.5,
      }}
      className={cn(className)}
    >
      <Component />
    </motion.div>
  );
};

export default MotionWrap;
