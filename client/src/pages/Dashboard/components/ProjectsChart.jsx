import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function ProjectsChart() {
  const { darkMode } = useContext(ThemeContext);
  const [chartColors, setChartColors] = useState(["#2dd4bf", "#60a5fa"]);
  const [iotProjects, setIotProjects] = useState([]);
  const [devsProjects, setDevsProjects] = useState([]);
  const [esProjects, setESProjects] = useState([]);
  const [aiProjects, setAiProjects] = useState([]);


  const data = [
    { id: 0, value: iotProjects.length, label: "IOT" },
    { id: 1, value: devsProjects.length, label: "Software Developement" },
    { id: 2, value: esProjects.length, label: "Embedded system" },
    { id: 3, value: aiProjects.length, label: "Artificial intelligence" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/project/getAll")
      .then((response) => response.json())
      .then((data) => {
        const { allprojects } = data;
        setIotProjects(allprojects.filter((project) => project.projectType === "IOT"));
        setDevsProjects(allprojects.filter((project) => project.projectType === "Software Developement"));
        setESProjects(allprojects.filter((project) => project.projectType === "Embedded system"));
        setAiProjects(allprojects.filter((project) => project.projectType === "Artificial intelligence"));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const colors = darkMode ? ["#1D2440", "#6F4875", "#525174", "#14171F"] : ["#2DD4BF", "#60A5FA", "#fecaca", "#f5d0fe"];
    setChartColors(colors);
  }, [darkMode]);

  return (
    <div className="">
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            color: "#fdb462",
          },
        ]}
        colors={chartColors}
        height={200}
        slotProps={{
          legend: {
            labelStyle: {
              fill: darkMode ? "#cffafe" : "#3b82f6",
            },
          },
        }}
      />
    </div>
  );
}
