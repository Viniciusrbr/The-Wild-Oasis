import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 noite",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 noites",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 noites",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 noites",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 noites",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 noites",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 noites",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ noites",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 noite",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 noites",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 noites",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 noites",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 noites",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 noites",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 noites",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ noites",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 noite");
      if (num === 2) return incArrayValue(arr, "2 noites");
      if (num === 3) return incArrayValue(arr, "3 noites");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 noites");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 noites");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 noites");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 noites");
      if (num >= 21) return incArrayValue(arr, "21+ noites");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Resumo da duração da estadia</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
