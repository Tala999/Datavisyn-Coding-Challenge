
import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useGeneContext } from "./GeneDataProvider";
import { getBiotypeColor } from "../utils/utils";

const BiotypeProportion = () => {
  const chartRef = useRef(null);
  const { data } = useGeneContext(); 

  // Get unique chromosomes and biotypes
  const chromosomes = [...new Set(data.map((d) => d.Chromosome))];
  const biotypes = [...new Set(data.map((d) => d.Biotype))];

  // Prepare data for each chromosome
  const chartData = chromosomes.map((chromosome) => {
    // Filter data for the current chromosome
    const filteredData = data.filter((d) => d.Chromosome === chromosome);

    // Count occurrences of each biotype for the current chromosome
    const biotypeCounts = filteredData.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.Biotype] = (acc[curr.Biotype] || 0) + 1;
      return acc;
    }, {});

    // Calculate the total count of biotypes for the current chromosome
    const totalCount = Object.values(biotypeCounts).reduce((sum, count) => sum + count, 0);

    // Normalize the counts to percentages
    const normalizedData = biotypes.map((biotype) => ({
      name: biotype,
      value: (biotypeCounts[biotype] || 0) / totalCount * 100, // Normalize to percentage
      itemStyle: { color: getBiotypeColor(biotype) },
    }));

    return {
      chromosome,
      normalizedData,
    };
  });

  // Flatten the normalized data to match the structure expected by the chart
  const seriesData = biotypes.map((biotype) => ({
    name: biotype,
    type: "bar",
    stack: "total",
    data: chartData.map((chromosomeData) => {
      const biotypeData = chromosomeData.normalizedData.find((d) => d.name === biotype);
      return biotypeData ? biotypeData.value : 0;
    }),
  }));

  // ECharts configuration for the stacked and normalized bar chart
  const option = {
    title: {
    //   text: "Biotype Proportions per Chromosome",
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}%", // Show the chromosome and the biotype percentage
    },
    xAxis: {
      type: "category",
      data: chromosomes, // All chromosomes are shown on the x-axis
      axisLabel: {
        rotate: 45, // Rotate labels for better visibility
      },
    },
    yAxis: {
      type: "value",
      name: "Percentage", // Y-axis represents percentages
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 14,
        padding: 50, // Space beside the label
      },
      max: 100, // 100% max value
    },
    legend: {
        type: "scroll",
        data: biotypes, // Show the legend for all biotypes
        top: "top",
        left: "center",
      },
      series: seriesData,
  };

  return (
    <div style={{ marginTop: "20px", padding: "20px", textAlign: "center" }} ref={chartRef}>
      <h3 style={{ marginBottom: "10px" }}>
        Proportion of Biotypes by Chromosome
      </h3>
      {chartData.length > 0 ? (
        <ReactECharts option={option} style={{ height: 300, width: "100%" }} />
      ) : (
        <p>No data found for the biotype proportions.</p>
      )}
    </div>
  );
};

export default BiotypeProportion;
