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

interface Category {
  category: string;
  id: number;
  survey: number;
}

interface Prompt {
  prompt: string;
  id: number;
  category: number;
  fill: string;
  transform: string;
}

interface PromptsProps {

  slices: Slice[];
  selectScore: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  add?: number;
}

interface State {
  categories: Category[];
  prompts: Prompt[];
  slices: Slice[];
  
}

function Prompts({
  slices,
  selectScore,
  add = 0,
}: PromptsProps) {
  console.log("Received props:", { slices, add });

  const categories = [{category: "SELF-AWARENESS", id: 0, survey: 5},{category: "SELF-MANAGEMENT", id: 1, survey: 5}]

  const prompts =  [{prompt: "1", id: 0, category: "1", fill: "#9245FF", transform: "0.01",},
    {prompt: "I can consistently identify and name my emotions in the moment.", id: 1, category: 0, fill: "#9245FF", transform: "0.01",}, 
    {prompt: "I use self-reflection to understand the factors that contribute to my emotions and how my emotions impact me.", id: 2, category: 9, fill: "#9245FF", transform: "0.01",}, 
    {prompt: "4", id: 3, category: 1, fill: "#9245FF", transform: "0.01",}, 
    {prompt: "5", id: 4, category: 1, fill: "#9245FF", transform: "0.01",}, 
    {prompt: "6", id: 5, category: 1, fill: "#9245FF", transform: "0.01",}]

  const questions = categories.map((category) => (
    <div key={category.id}>
      <div className="title" style={{ color: "grey" }}>{category.category}</div>
      {prompts
        .filter(prompt => prompt.category === category.id) // Filter prompts based on category
        .map(prompt => (
          <div key={prompt.id}>
            <p>{prompt.prompt}</p>
            <div className="Answer">
          <input
            onChange={selectScore(prompt.id + add)} // Invoke the selectScore function
            type="range"
            min="1"
            max="100"
            value={
              prompt.transform === "1.00"
                ? "100"
                : Math.round(parseFloat(prompt.transform) * 100).toString()
            }
            className="rangeInput"
            style={{ background: prompt.fill }}
          />
          <span className="Score" style={{ backgroundColor: prompt.fill }}>
            <div
              className="leftArrow"
              style={{ borderRight: `5px solid ${prompt.fill}` }}
            ></div>
            {prompt.transform === "1.00"
              ? "100"
              : Math.round(parseFloat(prompt.transform) * 100).toString()}
          </span>
        </div>
        <div className="SliderLabels">
          <div className="never">Strongly Disagree</div>
          <div className="seldom">Disagree</div>
          <div className="often">Agree</div>
          <div className="always">Strongly Agree</div>
        </div>
          </div>
        ))}
    </div>
  ));

  return (
    <div className="prompts-container">
      <ul className="prompts-list">
        {questions}
      </ul>
    </div>
  );
}

export default Prompts;
