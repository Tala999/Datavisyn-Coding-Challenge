import { MantineReactTable, MRT_ColumnDef, MRT_Cell } from "mantine-react-table";
import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { getBiotypeColor, getChromosomeColor } from '../utils/utils';
import { useGeneContext } from "./GeneDataProvider";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import BiotypeProportionforOneChrom from "./BiotypeProportionforOneChrom";
import BiotypeProportion from "./BiotypeProportion";
import ChromosomeCoverage from "./ChromosomeCoverage";
import ChromosomeGeneLengths from "./ChromosomeGeneLengths";


const TableDisplay = () => {
  const { data } = useGeneContext(); // Get data from context
  
  //Prepare cols with cell customization
  const columns: MRT_ColumnDef<Record<string, string>>[] = Object.keys(data[0] || {}).map((key) => ({
    accessorKey: key,
    header: key,
    Cell: key === "Biotype"
      ? ({ cell }: { cell: MRT_Cell<Record<string, string>> }) => {
          const value = cell.getValue<string>();
          const color = getBiotypeColor(value);
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Box
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: color,
                  marginRight: 8,
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              {value}
            </div>
          );
        }
      : undefined,
  }));

  // Process data for charts
  const countOccurrences = (data: Record<string, string>[], key: string): Record<string, number> => {
    return data.reduce((acc: Record<string, number>, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  };

  const biotypeCounts = countOccurrences(data, "Biotype");
  const totalGenes = data.length;


  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowSelection={false}
      enableColumnOrdering={true}
      positionExpandColumn="last"
      displayColumnDefOptions={{
        'mrt-row-expand': {
          mantineTableHeadCellProps: {
            align: 'right',
          },
          mantineTableBodyCellProps: {
            align: 'right',
          },
        },
      }}
      mantineTableBodyCellProps={({ cell }: { cell: MRT_Cell<Record<string, string>> }) => ({
        style: {
          backgroundColor:
            cell.column.id === "Chromosome"
              ? getChromosomeColor(cell.getValue<string>())
              : "transparent",
        },
      })}
      renderDetailPanel={({ row }) => {
        const [isLoaded, setIsLoaded] = useState(false);

        useEffect(() => {
          setIsLoaded(true);
        }, []);
      
        if (!isLoaded) {
          return <div>Loading...</div>;
        }
        const currentGeneData = row.original;
        const currentBiotype = row.original.Biotype;

        return (
          <div style={{ width: '100%', height: '100%' }}>
            <BarChart currentBiotype={currentBiotype} />
            <PieChart biotypeCounts={biotypeCounts} currentBiotype={currentBiotype} totalGenes={totalGenes}/>
            <BiotypeProportionforOneChrom row={currentGeneData}/>
            <BiotypeProportion />
            <ChromosomeCoverage />
            <ChromosomeGeneLengths row={currentGeneData}/>
          </div>
        );
      }}
    />
  );
};

export default TableDisplay;
