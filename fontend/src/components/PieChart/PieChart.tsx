import React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';

// Define the type for datum based on your data structure
interface CustomDatum {
  value: number;
  category: number;
  prompt: string;
  y: number;
  gradientId: string; // Add a gradient ID property
}

const PieChart: React.FC = () => {
   const containerWidth = 600;
  const containerHeight = 600;

  // SVG dimensions
  const width = 500;  
  const height = 500;

  const colorScale = ["#00A9B5", "#357AFF", "#9245FF","#FF5C00","#FF234B","#E5AC00", "#00AB3A",];
  const num_Prompts = 24;

  const getGradientId = (index: number) => `gradient-${index}`;

  const data: CustomDatum[] = [
    {y: 1, value: 8, category: 1, prompt:"I apply problem-solving techniques to situations in my life.", gradientId: getGradientId(0)},   
    {y: 1, value: 8, category: 1, prompt: "When I face a difficult decision, I use a decision-making process to help me make the best decision. ", gradientId: getGradientId(1)}, 
    {y: 1, value: 8, category: 1, prompt: "prompt 3", gradientId: getGradientId(2)},   
    {y: 1, value: 8, category: 1, prompt: "prompt 4", gradientId: getGradientId(3)},   
    {y: 1, value: 8, category: 2, prompt: "prompt 5", gradientId: getGradientId(4)}, 
    {y: 1, value: 8, category: 2, prompt: "prompt 6", gradientId: getGradientId(5)}, 
    {y: 1, value: 8, category: 2, prompt: "prompt 7", gradientId: getGradientId(6)},   
    {y: 1, value: 8, category: 2, prompt: "prompt 8", gradientId: getGradientId(7)}, 
    {y: 1, value: 8, category: 3, prompt: "prompt 9", gradientId: getGradientId(8)},   
    {y: 1, value: 8, category: 3, prompt: "prompt 10", gradientId: getGradientId(9)},   
    {y: 1, value: 8, category: 3, prompt: "prompt 11", gradientId: getGradientId(10)},
    {y: 1, value: 8, category: 3, prompt: "prompt 12", gradientId: getGradientId(11)},   
    {y: 1, value: 8, category: 4, prompt: "prompt 1", gradientId: getGradientId(12)},   
    {y: 1, value: 8, category: 4, prompt: "prompt 2", gradientId: getGradientId(13)}, 
    {y: 1, value: 8, category: 4, prompt: "prompt 3", gradientId: getGradientId(14)},   
    {y: 1, value: 8, category: 4, prompt: "prompt 4", gradientId: getGradientId(15)},   
    {y: 1, value: 8, category: 5, prompt: "prompt 5", gradientId: getGradientId(16)}, 
    {y: 1, value: 8, category: 5, prompt: "prompt 6", gradientId: getGradientId(17)}, 
    {y: 1, value: 8, category: 5, prompt: "prompt 7", gradientId: getGradientId(18)},   
    {y: 1, value: 8, category: 5, prompt: "prompt 8", gradientId: getGradientId(19)}, 
    {y: 1, value: 8, category: 6, prompt: "prompt 9", gradientId: getGradientId(20)},   
    {y: 1, value: 8, category: 6, prompt: "prompt 10", gradientId: getGradientId(21)},   
    {y: 1, value: 8, category: 6, prompt: "prompt 11", gradientId: getGradientId(22)},
    {y: 1, value: 8, category: 6, prompt: "prompt 12", gradientId: getGradientId(23)}, 
  ];

  const categoryData = [
    { x: "Category 1", y: 8 * 4 }, // 4 prompts in category 1
    { x: "Category 2", y: 8 * 4 }, // 4 prompts in category 2
    { x: "Category 3", y: 8 * 4 }, // 4 prompts in category 3
    { x: "Category 4", y: 8 * 4 }, // 4 prompts in category 3
    { x: "Category 5", y: 8 * 4 }, // 4 prompts in category 3
    { x: "Category 6", y: 8 * 4 }, // 4 prompts in category 3

    // Add categories with their corresponding prompt counts
  ];

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
  const gradients = data.map((datum, index) => {
    const [cx, cy] = calculateCValues(index);
    return (
      <radialGradient key={index} id={datum.gradientId} cx={cx.toString()} cy={cy.toString()} r="120%">
        <stop offset="0%" stopColor="white" />
        <stop offset="100%" stopColor={colorScale[datum.category % colorScale.length]} />
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
      <VictoryPie
     
     width={1200}
        radius={({ datum }) => 20 + datum.value * 20}
        data={data}
        labels={({ datum }) => `${datum.prompt}`}
        style={{ 
          data: { 
            fill: ({ datum }: { datum: CustomDatum }) => `url(#${datum.gradientId})`,
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
    </div>
  );
};

export default PieChart;
