import { useState } from "react";
import { useLocation } from "react-router-dom";
import Prompts from "../../components/Prompts/Prompts"
import "./TakeSurvey.css";
import PieChart2 from "../../components/PieChart/PieChart2";
import PieChart from "../../components/PieChart/PieChart";

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

function TakeSurvey() {

    
    
  const [state, setState] = useState({
    categories: [{ category: "Category 1", y: 8 * 4, id: 1, survey: 5 }, // 4 prompts in category 1
                  { category: "Category 2", y: 8 * 4, id: 2, survey: 5}, // 4 prompts in category 2
                  { category: "Category 3", y: 8 * 4, id: 3, survey: 5}, // 4 prompts in category 3
                  { category: "Category 4", y: 8 * 4, id: 4, survey: 5}, // 4 prompts in category 3
                  { category: "Category 5", y: 8 * 4, id: 5, survey: 5}, // 4 prompts in category 3
                  { category: "Category 6", y: 8 * 4, id: 6, survey: 5}], // 4 prompts in category 3],
    prompts: [
      {id: 0, y: 1, category: 1, prompt:"Promp 1", fill: "#00A9B5", transform: "0.01" },   
      {id: 1, y: 1, category: 1, prompt: "Prompt 2", fill: "#00A9B5", transform: "0.01" }, 
      {id: 2, y: 1, category: 1, prompt: "prompt 3", fill: "#00A9B5", transform: "0.01" ,},   
      {id: 3, y: 1, category: 1, prompt: "prompt 4", fill: "#00A9B5", transform: "0.01" },   
      {id: 4, y: 1, category: 2, prompt: "prompt 5", fill: "#357AFF", transform: "0.01" }, 
      {id: 5, y: 1, category: 2, prompt: "prompt 6", fill: "#357AFF", transform: "0.01" }, 
      {id: 6, y: 1, category: 2, prompt: "prompt 7", fill: "#357AFF", transform: "0.01" },   
      {id: 7, y: 1, category: 2, prompt: "prompt 8", fill: "#357AFF", transform: "0.01" }, 
      {id: 8, y: 1, category: 3, prompt: "prompt 9", fill: "#9245FF", transform: "0.01" },   
      {id: 9, y: 1, category: 3, prompt: "prompt 10", fill: "#9245FF", transform: "0.01" },   
      {id: 10, y: 1, category: 3, prompt: "prompt 11", fill: "#9245FF", transform: "0.01" },
      {id: 11, y: 1, category: 3, prompt: "prompt 12", fill: "#9245FF", transform: "0.01" },   
      {id: 12, y: 1, category: 4, prompt: "prompt 13", fill: "#FF5C00", transform: "0.01" },   
      {id: 13, y: 1, category: 4, prompt: "prompt 14", fill: "#FF5C00", transform: "0.01" }, 
      {id: 14, y: 1, category: 4, prompt: "prompt 15", fill: "#FF5C00", transform: "0.01" },   
      {id: 15, y: 1, category: 4, prompt: "prompt 16", fill: "#FF5C00", transform: "0.01" },   
      {id: 16, y: 1, category: 5, prompt: "prompt 17", fill: "#FF234B", transform: "0.01" }, 
      {id: 17, y: 1, category: 5, prompt: "prompt 18", fill: "#FF234B", transform: "0.01" }, 
      {id: 18, y: 1, category: 5, prompt: "prompt 19", fill: "#FF234B", transform: "0.01" },   
      {id: 19, y: 1, category: 5, prompt: "prompt 20", fill: "#FF234B", transform: "0.01" }, 
      {id: 20, y: 1, category: 6, prompt: "prompt 21", fill: "#E5AC00", transform: "0.01" },   
      {id: 21, y: 1, category: 6, prompt: "prompt 22", fill: "#E5AC00", transform: "0.01" },   
      {id: 22, y: 1, category: 6, prompt: "prompt 23", fill: "#E5AC00", transform: "0.01" },
      {id: 23, y: 1, category: 6, prompt: "prompt 24", fill: "#E5AC00", transform: "0.01" }, 
    ],
  });


  const location = useLocation();
  const survey = location.state?.survey;
  const [start, setStart] = useState(false);
  const [prompts, setPrompts] = useState(false)
  const [wheel, setWheel] = useState(false);

  

  const selectScore = (questionIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let targetValue = parseInt(e.target.value) / 100;
    if (targetValue === 1) {
      targetValue = 1.0;
    }
    const newState = { ...state };
    newState.prompts[questionIndex].transform = targetValue.toString();
    setState(newState);
  };


  if (!survey) {
    return <p>No survey data available.</p>;
  }
  
  console.log("HERE:")
  console.log(state.categories)
  return (
    <div className="take-survey">
        {!start && ( 
            <div>
                <h1>{survey.survey}</h1>
                <p>Date: {survey.data}</p>
                <p>Class: {survey.class}</p>
                <p>Status: {survey.status}</p>
                <button onClick={() => {setStart(true); setPrompts(true);}}>Start Survey</button>
                </div>)
        }
        {
            prompts && (
                <div className="survey-content"> 
                <Prompts state={state} selectScore={selectScore} add={1} />                
                <button className="wheel-button" onClick={() => {setPrompts(false); setWheel(true)}}>Go To Wheel</button>
                </div>
            )
        }
        {
            wheel && (
                <div > 
                     
                    <PieChart state={state}  />
                    <button className="wheel-button" onClick={() => {setPrompts(true); setWheel(false)}}>Back To Prompts</button>


                </div>
            )
        }


     
      {/* Add your survey form or other components here */}
    </div>
  );
}

export default TakeSurvey;
