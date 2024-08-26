import  {useState} from "react";
import "./Prompts.css";
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
interface State {
  categories: Category[];
  prompts: Prompt[];
}

interface PromptsProps {
  state: State;
  selectScore: Function;
  add: number;
}

function Prompts({
  state,
  selectScore,
  add,
  
}: PromptsProps) {
  console.log("Received props:", { state, add });


  
  const questions = state.categories.map((category) => (
    <div key={category.id}>
      <div className="title" style={{ color: "grey" }}>{category.category}</div>
      {state.prompts
        .filter(prompt => prompt.category === category.id) // Filter prompts based on category
        .map(prompt => (
          <div key={prompt.id}>
            <p>{prompt.prompt}</p>
            <div className="Answer">
          <input
            onChange={selectScore(prompt.id)} // Invoke the selectScore function
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
