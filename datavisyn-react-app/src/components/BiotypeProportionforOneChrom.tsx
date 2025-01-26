import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";
import { getBiotypeColor } from "../utils/utils";
import { useGeneContext } from "./GeneDataProvider";


const BiotypeProportionforOneChrom = ({ row }: { row: Record<string, string> }) => {
  const chartRef = useRef(null);
  const { data } = useGeneContext(); //read data from file
  const chromosome = row.Chromosome;  // Get the selected chromosome from the row

  // Filter data for the selected chromosome
  const filteredData = data.filter((d) => d.Chromosome === chromosome);

  // Count occurrences of each biotype for the selected chromosome
  const biotypeCounts = filteredData.reduce((acc: { [key: string]: number }, curr) => {
    acc[curr.Biotype] = (acc[curr.Biotype] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart, filtering out biotypes with zero count
  const chartData = Object.entries(biotypeCounts)
    .filter(([, count]) => count > 0)
    .map(([biotype, count]) => ({
      name: biotype,
      value: count,
      itemStyle: { color: getBiotypeColor(biotype) }, // Apply dynamic color for each biotype
    }));

  // ECharts configuration for the bar chart
  const option = {
    title: {
      text: `Biotype Counts on Chromosome ${chromosome}`,
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}", // Show the biotype name and its count
    },
    xAxis: {
      type: "category",
      data: chartData.map((d) => d.name), // Biotype names on the X-axis
      axisLabel: {
        rotate: 45, // Rotate labels for better visibility
      },
    },
    yAxis: {
      type: "value",
      name: "Gene Count", // Y-axis label
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 14,
        padding: 50, // Space beside the label
      },
    },
    series: [
      {
        type: "bar",
        data: chartData.map((d) => d.value), // Gene counts for each biotype
        
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px", padding: "20px", textAlign: "center", width: '100%', height: 400 }} ref={chartRef}>
      {chartData.length > 0 ? (
        <ReactECharts option={option} style={{ height: 300, width: "100%" }} />
      ) : (
        <p>No biotypes found for chromosome {chromosome}.</p>
      )}
    </div>
  );
};

export default BiotypeProportionforOneChrom;


