import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar(props) {
  const [pathClr, setPathClr] = useState(null);

  useEffect(() => {
    const score = props.score;
    if (score >= 0 && score <= 5) {
      setPathClr("rgb(152,161,187)");
    } else if (score >= 6 && score < 15) {
      setPathClr("rgba(249, 201, 78, 1)");
    } else {
      setPathClr("rgba(60, 194, 138, 1)");
    }
  }, [props.score]);

  return (
    <div
      className={`text-black font-semibold ${
        props.lg ? "w-[60px] h-[60px]" : "w-[45px] h-[45px]"
      }`}
    >
      <CircularProgressbar
        value={props.score * 5}
        text={`${props.score !== undefined ? props.score : 0}/20`}
        styles={buildStyles({
          strokeLinecap: "round",
          textSize: "20px",
          pathTransitionDuration: 2,
          transition: "stroke-dashoffset 0.5s ease 0s",
          transform: "rotate(0.25turn)",
          transformOrigin: "center center",

          pathColor: `${pathClr}`,
          textColor: `rgba(30, 32, 38, 1)`,
        })}
      />
    </div>
  );
}
