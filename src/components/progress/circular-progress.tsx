import { motion } from "framer-motion";

type Props = {
  progress: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

const radius = 70;
const circumference = 2 * Math.PI * radius;
const initialOffset = circumference;

const CircularProgress = ({
  progress,
  width = 150,
  height = 150,
  strokeWidth = 10,
}: Props) => {
  const strokeDashoffset = initialOffset - (progress / 100) * circumference;

  return (
    <svg width={width} height={height}>
      <g
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: `${width / 2}px ${height / 2}px`,
        }}
      >
        <circle
          stroke="#fff"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={width / 2}
          cy={height / 2}
        />
        <motion.circle
          stroke={"#657ef8"}
          fill={"transparent"}
          strokeWidth={strokeWidth}
          r={radius}
          cx={width / 2}
          cy={height / 2}
          strokeDasharray={circumference}
          strokeDashoffset={initialOffset}
          initial={{ strokeDashoffset: initialOffset }}
          animate={{ strokeDashoffset }}
          // transition={{ duration: 1 }}
        />
      </g>
      <foreignObject
        x={Math.round(width / 4) - 3}
        y={Math.round(height / 4) + 3}
        width={width / 2 + 5}
        height={height / 2 + 5}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            color: "#657ef8",
            fontSize: "1.2rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          <div>{progress.toFixed(2)}</div>%
        </div>
      </foreignObject>
    </svg>
  );
};

export default CircularProgress;
