import { useState } from "react";
import { useLocation } from "react-router-dom";
import Prompts from "../../components/Prompts/Prompts"
import "./TakeSurvey.css";
import PieChart2 from "../../components/PieChart/PieChart2";

interface Slice {
    id: number;
    question: string;
    title: string;
    rotate: string;
    fill: string;
    transform: string;
  }
  
  interface State {
    slices: Slice[];
  }

function TakeSurvey() {

    const prompts_values = [{prompt: "1", id: 0, category: 1},
        {prompt: "2", id: 1, category: "1"}, 
        {prompt: "3", id: 2, category: "1"}, 
        {prompt: "4", id: 3, category: "2"}, 
        {prompt: "5", id: 4, category: "2"}, 
        {prompt: "6", id: 5, category: "2"}]


    const category_values = [{category: "1", id: 0, survey: 5},{category: "2", id: 1, survey: 5}]

    
    const [state, setState] = useState({
        slices: [
          {
            id: 1,
            question:
              "I can consistently identify and name my emotions in the moment.",
            title: "SELF-AWARENESS",
            rotate: "rotate(46.0000, 220, 220)",
            fill: "#9245FF",
            transform: "0.01",
          },
          {
            id: 2,
            question:
              "I use self-reflection to understand the factors that contribute to my emotions and how my emotions impact me.",
            title: "",
            rotate: "rotate(64.0000, 220, 220)",
            fill: "#9245FF",
            transform: "0.01",
          },
          {
            id: 3,
            question:
              "I consistently recognize and reflect on ways in which my identity is shaped by other people and my race, culture, experiences and environment.",
            title: "",
            rotate: "rotate(82.0000, 220, 220)",
            fill: "#9245FF",
            transform: "0.01",
          },
          {
            id: 4,
            question:
              "I recognize and reflect on ways in which my identity shapes my views, biases, and prejudices.",
            title: "",
            rotate: "rotate(100.0000, 220, 220)",
            fill: "#9245FF",
            transform: "0.01",
          },
          {
            id: 5,
            question:
              "I consistently find ways to manage strong emotions in ways that don’t negatively impact others.",
            title: "SELF-MANAGEMENT",
            rotate: "rotate(118.0000, 220, 220)",
            fill: "#357AFF",
            transform: "0.01",
          },
          {
            id: 6,
            question: "I can calm myself when I feel stressed or nervous.",
            title: "",
            rotate: "rotate(136.0000, 220, 220)",
            fill: "#357AFF",
            transform: "0.01",
          },
          {
            id: 7,
            question:
              "I set measurable, challenging, and attainable goals and have clear steps in place to reach them.",
            title: "",
            rotate: "rotate(154.0000, 220, 220)",
            fill: "#357AFF",
            transform: "0.01",
          },
          {
            id: 8,
            question: "I balance my work life with personal renewal time.",
            title: "",
            rotate: "rotate(172.0000, 220, 220)",
            fill: "#357AFF",
            transform: "0.01",
          },
          {
            id: 9,
            question:
              "I can grasp a person's perspective and feelings from both verbal and nonverbal cues.",
            title: "SOCIAL AWARENESS",
            rotate: "rotate(190.0000, 220, 220)",
            fill: "#00A9B5",
            transform: "0.01",
          },
          {
            id: 10,
            question:
              "I pay attention to the feelings of others and recognize how my words and behavior impact them.",
            title: "",
            rotate: "rotate(208.0000, 220, 220)",
            fill: "#00A9B5",
            transform: "0.01",
          },
          {
            id: 11,
            question:
              "I show care for others when I see that they have been harmed in some way.",
            title: "",
            rotate: "rotate(226.0000, 220, 220)",
            fill: "#00A9B5",
            transform: "0.01",
          },
          {
            id: 12,
            question: "I learn from those who have different opinions than me.",
            title: "",
            rotate: "rotate(244.0000, 220, 220)",
            fill: "#00A9B5",
            transform: "0.01",
          },
          {
            id: 13,
            question:
              "I stay focused when listening to others and carefully consider their meaning.",
            title: "RELATIONSHIP SKILLS",
            rotate: "rotate(262.0000, 220, 220)",
            fill: "#FF5C00",
            transform: "0.01",
          },
          {
            id: 14,
            question:
              "When I am upset with someone, I talk to them about how I feel and listen to their perspective.",
            title: "",
            rotate: "rotate(280.0000, 220, 220)",
            fill: "#FF5C00",
            transform: "0.01",
          },
          {
            id: 15,
            question:
              "I openly admit my mistakes to myself and others and work to make things right.",
            title: "",
            rotate: "rotate(298.0000, 220, 220)",
            fill: "#FF5C00",
            transform: "0.01",
          },
          {
            id: 16,
            question:
              "I can work through my discomfort when dealing with conflict, listen to feelings from all parties, and help them understand different perspectives.",
            title: "",
            rotate: "rotate(316.0000, 220, 220)",
            fill: "#FF5C00",
            transform: "0.01",
          },
          {
            id: 17,
            question:
              "I involve others who are impacted to explore a problem collaboratively before choosing a solution or launching a new project.",
            title: "RESPONSIBLE DECISION MAKING",
            rotate: "rotate(334.0000, 220, 220)",
            fill: "#E5AC00",
            transform: "0.01",
          },
          {
            id: 18,
            question: "I find practical and respectful ways to overcome difficulty, even when it comes to making decisions that may not be popular.",
            title: "",
            rotate: "rotate(352.0000, 220, 220)",
            fill: "#E5AC00",
            transform: "0.01",
          },
          {
            id: 19,
            question: "I consider how my choices will be viewed through the lens of the young people I serve and the community around them.",
            title: "",
            rotate: "rotate(370.0000, 220, 220)",
            fill: "#E5AC00",
            transform: "0.01",
          },
          {
            id: 20,
            question: "I take time for self reflection and group reflection on progress toward goals and the process used.",
            title: "",
            rotate: "rotate(388.0000, 220, 220)",
            fill: "#E5AC00",
            transform: "0.01",
          },
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
    newState.slices[questionIndex].transform = targetValue.toString();
    setState(newState);
  };

 


  if (!survey) {
    return <p>No survey data available.</p>;
  }

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
                    <Prompts  categories={category_values} prompts={prompts_values} slices={state.slices} selectScore={selectScore} />
                    <button className="wheel-button" onClick={() => {setPrompts(false); setWheel(true)}}>Go To Wheel</button>
                </div>
            )
        }
        {
            wheel && (
                <div> 
                    <PieChart2 />

                </div>
            )
        }


     
      {/* Add your survey form or other components here */}
    </div>
  );
}

export default TakeSurvey;
