import React from 'react';
import { GoslingComponent} from 'gosling.js';

const ChromosomeVisualization = () => {
  return (
    <div>
      <h3>Chromosome Ideogram with Genes</h3>
      <GoslingComponent
        spec={{
          tracks: [
            {
              type: 'ideo',
              data: [
                {
                  chr: '1',
                  size: 248956422,
                },
                {
                  chr: '2',
                  size: 242193529,
                },
                {
                  chr: '3',
                  size: 198295559,
                },
                // Add more chromosomes as needed
              ],
              alignment: 'bottom',
            },
            {
              type: 'scatter',
              data: [
                { chr: '1', start: 100000, end: 200000, label: 'Gene 1' },
                { chr: '1', start: 500000, end: 600000, label: 'Gene 2' },
                { chr: '2', start: 200000, end: 300000, label: 'Gene 3' },
                { chr: '2', start: 700000, end: 800000, label: 'Gene 4' },
                // Add more gene data as needed
              ],
              encoding: {
                x: { field: 'start', type: 'quantitative' },
                x2: { field: 'end' },
                y: { field: 'chr', type: 'nominal' },
                color: { field: 'label', type: 'nominal' },
              },
              size: 20,
            },
          ],
          width: 800,
          height: 400,
        }}
      />
    </div>
  );
};

export default ChromosomeVisualization;
