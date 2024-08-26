import React from 'react';
import { VictoryPie, VictoryTooltip, VictoryStack } from 'victory';

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
interface PieProps {
  state: State;
}

function PieChart({
    state,
   
    
  }: PieProps) {
    console.log("Received props:", { state });

   const containerWidth = 600;
  const containerHeight = 600;

  // SVG dimensions
  const width = 500;  
  const height = 500;

  const colorScale = ["#00A9B5", "#357AFF", "#9245FF","#FF5C00","#FF234B","#E5AC00", "#00AB3A",];
  const num_Prompts = 24;

  const getGradientId = (index: number) => `gradient-${index}`;



  

  // Function to calculate cx and cy values
  const calculateCValues = (index: number) => {
    const fraction = (index + 1) / num_Prompts;
    if (fraction <= 0.25) {
      return [0, 1];
    } else if (fraction <= 0.5) {
      return [0, 0];
    } else if (fraction <= 0.75) {
      return [1, 0];
    } else {
      return [1, 1];
    }
  };

  // Generate radial gradient definitions
  const gradients = state.prompts.map((datum, index) => {
    const [cx, cy] = calculateCValues(index);
    return (
      <radialGradient key={index} id={getGradientId(datum.id)} cx={cx.toString()} cy={cy.toString()} r="120%">
        <stop offset="0%" stopColor="white" />
        <stop offset="100%" stopColor={datum.fill} />
      </radialGradient>
    );
  });

  

  return (
    <div>
      <svg >
        <defs>
          {gradients}
        </defs>
      </svg>
      <VictoryStack height={500} width={800}>
    
     
      <VictoryPie
     
    
        radius={({ datum }) => 20 + Math.round(parseFloat(datum.transform) * 9) * 20}
        data={state.prompts}
        labels={({ datum }) => `${datum.prompt}`}
        style={{ 
          data: { 
            fill: ({ datum }: { datum: Prompt }) => `url(#${getGradientId(datum.id)})`,
            stroke: "white",
            strokeWidth: 0.2
          } 
        }}
        colorScale={colorScale} // This will be ignored, since you're using gradients
        labelComponent={
          <VictoryTooltip
            
          />
        }
      />
       <VictoryPie
        data={state.categories}
        
       
        radius={199} // Adjust the radius for the outer wheel
        style={{
          data: {
            fill: "#EFEFEF",
            stroke: "white",
            strokeWidth: 1.5
            
          }
        }}
      />
      </VictoryStack>
    </div>
  );
};

export default PieChart;
