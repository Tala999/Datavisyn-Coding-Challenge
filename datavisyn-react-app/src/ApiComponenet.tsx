
// interface GeneInfoProps {
//   error: string | null;
//   data: any;
// //   isLoading: boolean;
// }

//   if (isLoading) {
//     return <p>Loading data...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   if (!data) {
//     return <p>No data available.</p>;
//   }

//   return (
//     <div>
//       <h2>Results:</h2>
//       <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default GeneInfo;


import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useState, useEffect } from "react";
import { isConcatSpec } from "vega-lite/build/src/spec/concat";

// Define the type for the dataset
interface Hit {
  _id?: string;
  _score?: number;
  entrezgene?: string;
  name?: string;
  symbol?: string;
  taxid?: number;
  [key: string]: any; // Allow additional keys
}

const GeneInfo = () => {
  const [geneData, setGeneData] = useState<Hit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGeneData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/gene-info/cdk2");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGeneData(data.hits || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeneData();
  }, []);

  

  //Define columns for the table
  const columns: MRT_ColumnDef<Hit>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "_score",
      header: "Score",
    },
    {
      accessorKey: "entrezgene",
      header: "entrezgene",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
    },
    {
      accessorKey: "taxid",
      header: "Taxonomy ID",
    },
    
  ];
  console.log(columns);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available CDK2 Genes</h1>
      <MantineReactTable columns={columns} data={geneData} />
    </div>
  );
};

export default GeneInfo;

// import React, { useEffect, useState } from 'react';

// const FetchPCAData = () => {
//   const [pcaData, setPcaData] = useState(null);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     // Use fetch to get the data from the FastAPI backend
//     fetch("http://localhost:8000/pca")
//       .then((response) => response.json())  // Parse the JSON response
//       .then((data) => setPcaData(data))     // Set the data in the state
//       .catch((err: Error) => setError(err));       // Handle any errors
//   }, []);

//   if (error) {
//     return <div>Error fetching PCA data: {error.message}</div>;
//   }

//   if (!pcaData) {
//     return <div>Loading PCA data...</div>;
//   }

//   return (
//     <div>
//       <h3>PCA Data</h3>
//       <pre>{JSON.stringify(pcaData, null, 2)}</pre>
//     </div>
//   );
// };

// export default FetchPCAData;



