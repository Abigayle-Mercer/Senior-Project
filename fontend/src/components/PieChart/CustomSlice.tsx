import React from 'react';
import * as d3 from 'd3-shape';
import { VictorySliceProps } from 'victory';

const getLighterColor = (color: string, percentage: number): string => {
  const decColor = parseInt(color.substr(1), 16);
  const r = (decColor >> 16) & 255;
  const g = (decColor >> 8) & 255;
  const b = decColor & 255;

  const lighterR = Math.round(r + (255 - r) * (percentage / 100));
  const lighterG = Math.round(g + (255 - g) * (percentage / 100));
  const lighterB = Math.round(b + (255 - b) * (percentage / 100));

  return `rgb(${lighterR}, ${lighterG}, ${lighterB})`;
};

const CustomSlice: React.FC<VictorySliceProps> = (props) => {
  const { datum, style, events, slice } = props;
  const gradientId = `gradient-${datum.x}-${datum.y}`;

  const lighterColor = getLighterColor(style.fill as string, 100);

  const arcGenerator = d3.arc<d3.DefaultArcObject>()
    .innerRadius(slice.innerRadius)
    .outerRadius(slice.outerRadius)
    .startAngle(slice.startAngle)
    .endAngle(slice.endAngle);

  const path = arcGenerator(slice) as string;

  return (
    <g key={`slice-${datum.x}-${datum.y}`} {...events}>
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={lighterColor} />
          <stop offset="100%" stopColor={style.fill} />
        </radialGradient>
      </defs>
      <path d={path} fill={`url(#${gradientId})`} style={style} />
    </g>
  );
};

export default CustomSlice;
