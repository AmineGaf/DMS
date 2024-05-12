import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function ProjectsStatistics() {
  const { darkMode } = useContext(ThemeContext);
  const [monthlyProjects, setMonthlyProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/project/getAll")
      .then((response) => response.json())
      .then((data) => {
        const { allprojects } = data;
        const projectsByMonth = [];
        for (let i = 0; i < 12; i++) {
          const projects = allprojects.filter((project) => {
            const creationDate = new Date(project.CreationDate);
            return creationDate.getMonth() === i;
          });
          projectsByMonth.push({
            month: new Date(0, i).toLocaleString("en-us", { month: "short" }),
            numProjects: projects.length,
          });
        }
        setMonthlyProjects(projectsByMonth);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: "Number of Projects",
        labelStyle: {
          fill: darkMode ? "#cffafe" : "#3b82f6",
        },
      },
    ],
    series: [{ dataKey: "numProjects", label: "Projects" }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={monthlyProjects}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        {...chartSetting}
        slotProps={{
          bar: {
            clipPath: `inset(0px round 10px 10px 0px 0px)`,
          },
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