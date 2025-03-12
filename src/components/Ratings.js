import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "../styles/Ratings.css";

const Ratings = ({ ratingsData }) => {
  const defaultData = [
    { name: "Active Filings", value: 156, color: "#E47628" },
    { name: "Inactive Filings", value: 60, color: "#2F4532" },
    { name: "Unknown", value: 30, color: "#F6CBA9" },
  ];

  const data = ratingsData || defaultData;
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="ratings-wrapper">
      
      <div className="ratings-text">
        {data.map((item, index) => (
          <div key={index} className="rating-item">
            <span className="rating-label">{item.name}</span>
            <span className="rating-value">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="ratings-chart" >
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Ratings;
