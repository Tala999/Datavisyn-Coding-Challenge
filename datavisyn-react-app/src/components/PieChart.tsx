// PieChart.tsx
import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { getBiotypeColor } from '../utils/utils';

interface PieChartProps {
  biotypeCounts: Record<string, number>;
  totalGenes: number;
  currentBiotype: string;
}

const PieChart: React.FC<PieChartProps> = ({ biotypeCounts, totalGenes, currentBiotype }) => {
    const chartRef = useRef(null); //read data from file
    
    const biotypeCount = biotypeCounts[currentBiotype] || 0;

    const pieChartData = [
    {
        value: biotypeCount,
        name: currentBiotype,
        itemStyle: { color: getBiotypeColor(currentBiotype) },
    },
    {
        value: totalGenes - biotypeCount,
        name: 'Other',
        itemStyle: { color: '#E0E0E0' },
    },
    ];

    const pieOptions = {
        title: {
        text: `Proportion of ${currentBiotype} among all genes`,
        left: 'center',
        },
        tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
        },
        series: [
        {
            name: 'Biotype Proportion',
            type: 'pie',
            radius: ['40%', '70%'],
            data: pieChartData,
            label: {
            show: true,
            formatter: '{b}: {d}%',
            position: 'outside',
            },
            labelLine: {
            show: true,
            length: 10,
            length2: 20,
            },
        },
        ],
    };

  return (
  <div style={{ width: '100%', height: 400 }} ref={chartRef}>
    <ReactECharts option={pieOptions} style={{ height: '100%', width: '100%' }} />;
  </div>
  )
};

export default PieChart;
