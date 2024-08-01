import React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';

// Define the type for datum based on your data structure
interface CustomDatum {
  z: number;
  m: string;
  x: any;
  y: number;
  gradientId: string; // Add a gradient ID property
}

const PieChart: React.FC = () => {
  const width = 500;  // Width of the pie chart
  const height = 500; // Height of the pie chart
  const radius = Math.min(width, height) / 2; // Radius of the pie chart
  const colorScale = ["#c43a31", "#00a4e4", "#f1c40f"];
  
  // Function to generate gradient IDs dynamically
  const getGradientId = (index: number) => `gradient-${index}`;

  // Prepare data with gradient IDs
  const data: CustomDatum[] = [
    { x: "", y: 1, z: 2, m: "prompt 1", gradientId: getGradientId(0) },
    { x: "", y: 1, z: 3, m: "prompt 2", gradientId: getGradientId(1) },
    { x: "", y: 1, z: 5, m: "prompt 3", gradientId: getGradientId(2) },
    { x: "", y: 1, z: 5, m: "prompt 3", gradientId: getGradientId(2) },
    { x: "", y: 1, z: 5, m: "prompt 3", gradientId: getGradientId(2) },
    { x: "", y: 1, z: 5, m: "prompt 3", gradientId: getGradientId(2) }
  ];

  // Generate radial gradient definitions with fixed center positions
  const gradients = colorScale.map((color, index) => (
    <radialGradient
      key={index}
      id={getGradientId(index)}
      cx="0.5px"   // Center horizontally at 50% of the bounding box
      cy="0.5px"   // Center vertically at 50% of the bounding box
      r="50%"    // Radius of the gradient
     
    >
      <stop offset="0%" stopColor="white" />
      <stop offset="100%" stopColor={color} />
    </radialGradient>
  ));

  return (
    <div>
      <svg style={{ height: 0 }}>
        <defs>
          {gradients}
        </defs>
      </svg>
      <VictoryPie
        radius={({ datum }) => 20 + datum.z * 20}
        data={data}
        labels={({ datum }) => `y: ${datum.m}`}
        style={{ 
          data: { 
            fill: ({ datum }: { datum: CustomDatum }) => `url(#${datum.gradientId})`,
            stroke: "white",
            strokeWidth: 0.5
          } 
        }}
        colorScale={colorScale} // This will be ignored, since you're using gradients
        labelComponent={
          <VictoryTooltip
            style={{ fill: "tomato" }}
          />
        }
      />
    </div>
  );
};

export default PieChart;
