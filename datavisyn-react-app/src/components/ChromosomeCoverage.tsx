import React, { useContext, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useGeneContext } from "./GeneDataProvider";

const ChromosomeCoverage = () => {
  const chartRef = useRef<HTMLDivElement | null>(null); // Unique reference for the chart container
  const {data} = useGeneContext();  
  
  // Preprocess the data for ECharts
  const processedData = data.map((row) => ({
    chromosome: row["Chromosome"], 
    start: parseInt(row["Seq region start"], 10), 
    end: parseInt(row["Seq region end"], 10), 
    gene: row["Biotype"], 
  }));

  // Group data by chromosome and calculate the total gene coverage for each chromosome
  const chromosomeCoverage = processedData.reduce((acc, row) => {
    if (!acc[row.chromosome]) {
      acc[row.chromosome] = 0;
    }
    // Calculate coverage by subtracting start from end
    acc[row.chromosome] += row.end - row.start;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for ECharts (convert the grouped data into an array)
  const chartData = Object.keys(chromosomeCoverage).map((chromosome) => ({
    chromosome,
    coverage: chromosomeCoverage[chromosome],
  }));

  useEffect(() => {
    if (chartRef.current) {
      // Initialize ECharts instance
      const chart = echarts.init(chartRef.current);

      // Define the chart options
      const options = {
        title: {
          text: "Chromosome Coverage Visualization",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: chartData.map((row) => row.chromosome), // Unique chromosome names
          axisLabel: {
            rotate: 45, 
          },
        },
        yAxis: {
          type: "value",
          name: "Gene Coverage",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "Gene Coverage",
            type: "bar",
            data: chartData.map((row) => row.coverage), // Total coverage for each chromosome
            itemStyle: {
              color: "#33cc33", 
            },
          },
        ],
      };

      // Set the options to the chart instance
      chart.setOption(options);

      // Cleanup chart instance on component unmount
      return () => {
        chart.dispose();
      };
    }
  }, [chartData]); // Re-run effect when data changes

  return <div style={{ width: "100%", height: "400px" }} ref={chartRef}></div>;
};

export default ChromosomeCoverage;
