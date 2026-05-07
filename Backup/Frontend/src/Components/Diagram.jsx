import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Loading_Diagram from "../assets/Loading_Diagram.png";

const zeroLinePlugin = {
  id: "zeroLinePlugin",
  afterDraw: (chart) => {
    const xAxis = chart.scales.x;
    const ctx = chart.ctx;
    const zeroX = xAxis.getPixelForValue(0);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(zeroX, chart.chartArea.top);
    ctx.lineTo(zeroX, chart.chartArea.bottom);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.restore();
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartDataLabels,
  zeroLinePlugin
);

function Diagram({ shapData, isLoading }) {
  const chartRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!shapData && !isLoading) return <div className="VariableDisplay"><h2>SHAP</h2></div>;

  const allEntries = shapData
    ? Object.entries(shapData).sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
    : [];

  const topFour = allEntries.slice(0, 4);
  const remaining = allEntries.slice(4);

  let finalFeatures = topFour.map(([key]) => key);
  let finalValues = topFour.map(([, val]) => val);

  if (!isExpanded) {
    const otherSum = remaining.reduce((sum, [, val]) => sum + val, 0);
    if (remaining.length > 0) {
      finalFeatures.push("Other");
      finalValues.push(otherSum);
    }
  } else {
    finalFeatures.push("Collapse");
    finalValues.push(0);
    remaining.forEach(([key, val]) => {
      finalFeatures.push(key);
      finalValues.push(val);
    });
  }

  const totalAbs = shapData
    ? Object.values(shapData).reduce((a, b) => a + Math.abs(b), 0)
    : 1;
  const percentValues = finalValues.map((v) => (v / totalAbs) * 100);

  const data = {
    labels: finalFeatures,
    datasets: [
      {
        label: "SHAP Value",
        data: percentValues,
        barThickness: 25,
        backgroundColor: finalValues.map((v, i) => {
          if (finalFeatures[i] === "Other" || finalFeatures[i] === "Collapse") return "#e0e0e0";
          return v >= 0 ? "rgba(103, 169, 207, 1)" : "rgba(239, 138, 98, 1)";
        }),
      },
    ],
  };

  const handleCanvasClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;
    const { canvas } = chart;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const yScale = chart.scales.y;

    if (x >= 0 && x <= yScale.right + 20) {
      const tickIndex = yScale.getValueForPixel(y);
      if (tickIndex >= 0 && tickIndex < finalFeatures.length) {
        const clickedLabel = finalFeatures[tickIndex];
        if (clickedLabel === "Other") setIsExpanded(true);
        if (clickedLabel === "Collapse") setIsExpanded(false);
      }
    }
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    events: ["click"],
    layout: { padding: { top: 10, right: 40 } },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return label === "Collapse" ? "" : value.toFixed(1) + "%";
        },
        color: "#333",
        offset: 4,
        font: {size: 14, weight: "bold"}
      },
    },
    scales: {
      x: {
        display: true,
        min: -100,
        max: 100,
        border: { display: false },
        grid: { drawBorder: false },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          autoSkip: false,
          font: { weight: "bold" },
          color: (context) =>
            context.tick.label === "Other" || context.tick.label === "Collapse"
              ? "#007bff"
              : "#333",
        },
      },
    },
  };

  const rowHeight = 45;
  const chartHeight = isExpanded ? `${finalFeatures.length * rowHeight}px` : "100%";

  return (
    <div className="VariableDisplay" style={{ padding: "20px", position: "relative" }}>
      <h2>SHAP Analysis</h2>
      <div
        style={{
          height: "460px",
          width: "100%",
          overflowY: isExpanded ? "auto" : "hidden",
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            height: chartHeight,
            width: "100%",
            position: "relative",
            cursor: "default",
          }}
          onClick={handleCanvasClick}
        >
          {shapData && <Bar ref={chartRef} data={data} options={options} />}
        </div>
      </div>

      {isLoading && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          zIndex: 10,
        }}>
          <img src={Loading_Diagram} alt="Loading..." style={{ width: 500, opacity: 1 }} />
        </div>
      )}
    </div>
  );
}

export default Diagram;