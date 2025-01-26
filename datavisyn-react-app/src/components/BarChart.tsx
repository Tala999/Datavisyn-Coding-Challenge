import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";
import { getChromosomeColor } from '../utils/utils';
import { useGeneContext } from "./GeneDataProvider";

interface BarChartProps {
  currentBiotype: string; // Current Biotype for filtering
}

const BarChart: React.FC<BarChartProps> = ({ currentBiotype }) => {
  const { data } = useGeneContext(); //read data 
  const chartRef = useRef(null); //

  // Filter genes by the current Biotype
  const filteredGenes = data.filter(gene => gene.Biotype === currentBiotype);

  // Count chromosomes for the filtered Biotype
  const chromosomeCountsForBiotype = filteredGenes.reduce((acc: Record<string, number>, gene) => {
    acc[gene.Chromosome] = (acc[gene.Chromosome] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the bar chart
  const barChartData = Object.entries(chromosomeCountsForBiotype).map(([chromosome, count]) => ({
    name: chromosome,
    value: count,
    itemStyle: {
      color: getChromosomeColor(chromosome) || "#ccc",
    },
  }));

  // Options for the bar chart
  const barOptions = {
    title: {
      text: `Number of genes per chromosome for Biotype: ${currentBiotype}`,
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    xAxis: {
      type: "category",
      data: barChartData.map(d => d.name),
      axisLabel: {
        rotate: 45,
      },
      name: "Chromosome",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 14,
        padding: 20,
      },
    },
    yAxis: {
      type: "value",
      name: "Gene Count",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 14,
        padding: 50,
      },
    },
    series: [
      {
        type: "bar",
        data: barChartData,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: 400 }} ref={chartRef}>
        <ReactECharts option={barOptions} style={{ height: '100%', width: '100%' }} />
    </div>
  )
};

export default BarChart;
