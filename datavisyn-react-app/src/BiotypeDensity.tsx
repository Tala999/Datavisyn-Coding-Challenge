import React from 'react';
import { GoslingComponent } from 'gosling.js';

const BiotypeDensity = ({ data }: { data: any[] }) => {
  const processedData = data.map((d) => ({
    Chromosome: d.Chromosome,
    Biotype: d.Biotype,
    Count: 1, // Each entry represents a single gene
  }));

  return (
    <GoslingComponent
      spec={{
        layout: 'linear',
        tracks: [
          {
            data: { type: 'json', values: processedData },
            mark: 'rect',
            x: { field: 'Chromosome', type: 'nominal' },
            y: { field: 'Biotype', type: 'nominal' },
            color: { field: 'Count', type: 'quantitative' },
          },
        ],
      }}
    />
  );
};

export default BiotypeDensity;