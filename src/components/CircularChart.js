import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const CircularChart = ({ riskRating }) => {
  const riskValues = {
    A: 40,
    B: 60,
    C: 80,
    F: 100,
  };

  const riskValue = riskValues[riskRating] || 0; 

  const data = [
    { name: "F Rating", value: 100, fill: "#F9E5CA" },
    { name: "C Rating", value: 80, fill: "#FBAC71" },
    { name: "B Rating", value: 60, fill: "#39594A" },
    { name: "A Rating", value: 40, fill: "#FA761E" },
  ].map((d) =>
    d.name.startsWith(riskRating) ? { ...d, value: riskValue, fill: "#FF4500" } : d
  ); 

  return (
    <RadialBarChart
      width={250}
      height={250}
      cx="50%"
      cy="50%"
      innerRadius="40%"
      outerRadius="100%"
      barSize={15}
      data={data}
      startAngle={90}
      endAngle={-270}
    >
      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
      <RadialBar background dataKey="value" />
    </RadialBarChart>
  );
};

export default CircularChart;
