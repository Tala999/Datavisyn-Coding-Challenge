
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useGeneContext } from "./GeneDataProvider";

// compute gene lengths based on start and end positions
const computeGeneLengths = (data: Array<Record<string, string>>) => {
  return data.map((row) => ({
    chromosome: row.Chromosome,
    start: parseInt(row["Seq region start"], 10),
    end: parseInt(row["Seq region end"], 10),
    gene: row.Biotype, 
    geneName: row.Ensembl, 
    length: parseInt(row["Seq region end"], 10) - parseInt(row["Seq region start"], 10),
  }));
};

const ChromosomeGeneLengths = ({ row }: {row: Record<string, string>}) => {
  const {data} = useGeneContext();
  const chartRef = useRef<HTMLDivElement>(null)
  const chromosome = row.Chromosome;
  const currentEnsembl = row.Ensembl;

  // Compute the gene lengths once for the data
  const chartData = computeGeneLengths(data);

  // Filter the data to show only the selected chromosome's genes
  const filteredData = chartData.filter((item) => item.chromosome === chromosome);

  // Create the chart when the component mounts or the data changes
  useEffect(() => {
    if (chartRef.current && filteredData.length > 0) {
    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: `Gene Lengths found on Chromosome ${chromosome}`,
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const geneData = params.data;
          const geneName = geneData.geneName;
          const start = geneData.start;
          const end = geneData.end;
          const length = geneData.length;
          
          return `
            <strong>Gene: ${geneName}</strong><br/>
            Start: ${start} bp<br/>
            End: ${end} bp<br/>
            Length: ${length} bp
          `;
        }, // Show gene name and length
      },
      xAxis: {
        type: "value", 
        name: "Gene Position",
      },
      yAxis: {
        type: "value",
        name: "Gene Length (bp)",
      },
      series: [
        {
          data: filteredData.map((item) => ({
            value:[item.start, item.length],  
            geneName: item.geneName, 
            start:item.start,
            end: item.end,
            length: item.length,
          })),
          type: "scatter",
          symbolSize: 10, 
          
          itemStyle: (params: any) => {
            if(params.data.geneName === currentEnsembl) {
              return {
                color: "#FF0000",
              };
            }
            return {
              color: "#3398DB",
            };
          },
        },
      ],
    };

    chart.setOption(option);

    // Cleanup on unmount
    return () => {
      chart.dispose();
    };
  }
  }, [chromosome, filteredData, currentEnsembl]); // Re-run effect if chromosome or filteredData changes

  return (
    <div>
      <div
        id={`gene-lengths-chart-${chromosome}`}
        style={{ width: "100%", height: "400px" }}
        ref={chartRef}
      ></div>
    </div>
  );
};

export default ChromosomeGeneLengths;
