import React from "react";
import "./Prompts.css";

interface Slice {
  id: number;
  question: string;
  title: string;
  rotate: string;
  fill: string;
  transform: string;
}

interface PromptsProps {
  slices: Slice[];
  selectScore: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  add?: number;
}

const Prompts: React.FC<PromptsProps> = ({ slices, selectScore, add = 0 }) => {
  const questions = slices.map((slice, i) => (
    <div key={i}>
      <li>
        <div className="title" style={{color: "grey"}}>{slice.title}</div>
        <div className="question">{slice.question}</div>
        <div className="Answer">
          <input
            onChange={selectScore(i + add)} // Invoke the selectScore function
            type="range"
            min="1"
            max="100"
            value={
              slice.transform === "1.00"
                ? "100"
                : Math.round(parseFloat(slice.transform) * 100).toString()
            }
            className="rangeInput"
            style={{ background: slice.fill }}
          />
          <span className="Score" style={{ backgroundColor: slice.fill }}>
            <div
              className="leftArrow"
              style={{ borderRight: `5px solid ${slice.fill}` }}
            ></div>
            {slice.transform === "1.00"
              ? "100"
              : Math.round(parseFloat(slice.transform) * 100).toString()}
          </span>
        </div>
        <div className="SliderLabels">
          <div className="never">Strongly Disagree</div>
          <div className="seldom">Disagree</div>
          <div className="often">Agree</div>
          <div className="always">Strongly Agree</div>
        </div>
      </li>
    </div>
  ));

  return (
    <div className="prompts-container">
      <ul className="prompts-list">
        {questions}
      </ul>
    </div>
  );
};

export default Prompts;
