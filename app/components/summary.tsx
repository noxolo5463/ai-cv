import type { JSX } from "react";
import { Link } from "react-router";
import ScoreGauge from "./score-gauge";
import type { Feedback } from "types";

const Category = ({title, score}: {title: string, score: number}) =>{
    const textColor = score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";
    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items items-center justify-center">
                    <p className="text-2xl">
                        {title}
                    </p>
                </div>
                <p className="text-2xl">
                    <span className={textColor}>
                        {score}
                    </span> / 100
                </p>
            </div>
        </div>
    );
}

const Summary = ({ feedback }: { feedback: Feedback }): JSX.Element => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
                Your Resume Score
            </h2>
            <p className="text-sm text-gray-500">
                This score is calculated based on the variables below.
            </p>
        </div>
      </div>

      <Category title="Tone and Style" score={feedback.toneAndStyle.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
      <Category title="Content" score={feedback.content.score} />
    </div>
  );
};

export default Summary;
