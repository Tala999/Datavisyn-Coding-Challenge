import { MantineProvider } from '@mantine/core';
import { Application } from 'pixi.js';
import ApiComponenet from './ApiComponenet';
import { GeneDataProvider } from './components/GeneDataProvider'; // New file for centralized data management
import TableDisplay from './components/TableDisplay';

export default function App() {
  return (
    <MantineProvider>
      {/* <ApiComponenet/> */}
      <GeneDataProvider>
        <TableDisplay />
        {/* Uncomment and add more components here */}
      </GeneDataProvider>
    </MantineProvider>
  );
}