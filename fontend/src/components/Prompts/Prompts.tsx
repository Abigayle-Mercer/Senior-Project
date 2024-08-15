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
  category: string;
}

interface PromptsProps {
  slices: Slice[];
  selectScore: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  prompts: Prompt[];
  add?: number;
}

const Prompts: React.FC<PromptsProps> = ({ categories, prompts, slices, selectScore, add = 0 }) => {
  const questions = categories.map((category) => (
    <div key={category.id}>
      <div className="title" style={{ color: "grey" }}>{category.category}</div>
      {prompts
        .filter(prompt => prompt.category === category.category) // Filter prompts based on category
        .map(prompt => (
          <div key={prompt.id}> 
            <p>{prompt.prompt}</p>
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
};

export default Prompts;
