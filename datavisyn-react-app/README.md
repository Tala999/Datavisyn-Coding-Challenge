# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject` 

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




----------------------------------------------------
**Gene Data Visualization Project**

*This project is a web application built with React, TypeScript, Vite, and ECharts to visualize biological data related to human genes. It includes dynamic charts that display gene lengths for selected chromosomes and individual genes and more.*
----------------------------------------------------

# Features

1. Visualize gene lengths per chromosome using bar and scatter charts.

2. Highlight selected genes using custom colors.

3. Display detailed tooltips with gene information (name, start position, end position, and length).

4. Count human genes of the same Biotype.

5. Compare Chromosomes' coverage.

6. Indicate the longest gene on chromosomes among others. 
----------------------------------------------------

# Technologies Used

1. React: Frontend library for building the user interface.

2. TypeScript: JavaScript with static typing for type safety.

3. Vite: Next-generation frontend tooling for fast development and build processes.

4. ECharts: Visualization library used to render interactive charts.

5. Mantine: React component library for UI components.

6. React Context: Used for managing global state related to gene data.

7. FastAPI: Used to fetch simple data and display it in a table. 
----------------------------------------------------

# Installation

a. Prerequisites

  Make sure you have the following installed:

  1. Node.js (>= v16.x)

  2. npm 

b. Steps to Set Up the Project:

  Clone the repository:

`git clone <your-repository-url>`
`cd <project-directory>` 

c. Install dependencies:

Run the following command to install the necessary dependencies:

`nvm install --lts`
`npm install`

d. Start the development server:

Once dependencies are installed, start the development server:
**MAKE SURE YOU ARE INSIDE THE REACT APP FOLDER. IF NOT, MAKE SURE TO MOVE INSIDE THE 'datavisyn-react-app' BEFORE RUNNING THE VITE SERVER.**

`npm run dev `
    # or
`yarn dev`

Your app will be available at http://localhost:5173 by default (Vite's default port).
----------------------------------------------------

# Backend Setup

There is a backend folder included in the project, which contains a python file [main.py] for fetching data. The API used is built with FastAPI and it will be using the url [http://mygene.info/v3/query?q=symbol:cdk] to fetch data.

In this project, the api doesn't work unless you follow the following steps: 

1. Move inside the backend directory:

    `cd backend` 

2. From the App.tsx component file, make sure to uncomment the <ApiComponent> and comment the other components for displaying the result in a readable way. 

3. To set up and run the backend:
   
    a. Install FastAPI and required dependencies:

    ## Make sure you have Python installed. Then run the following command:

    `pip install fastapi uvicorn requests `

4. Running the Backend Server

    Navigate to the backend folder.

    Run the following command to start the FastAPI server:

    `uvicorn main:app --reload` 

By default, the server will be running at http://localhost:8000.

**NOTE: The component for displaying data fetched from this API is currently commented out. Uncomment it to enable API integration.**
----------------------------------------------------

# Main Project Structure

/backend
    /main.py                  # Python file for API Requests using FAST API. 
    /venv                     # vitrual environment where all installations are made when activated for a better performance.
/datavisyn-react-app
/src
  /components
    TableDisplay.tsx          # Component to display the gene data in a table format
    PieChart.tsx              # Component to render a pie chart of gene biotypes
    BarChart.tsx              # Component to render a bar chart of gene biotypes
    BiotypeProportion.tsx     # Component for visualizing biotype proportions
    BiotypeProportionforOneChrom.tsx # Component for visualizing biotype proportion per chromosome
    ChromosomeCoverage.tsx    # Component for chromosome coverage visualization
    ChromosomeGeneLengths.tsx # Component to visualize gene lengths on chromosomes
    GeneDataProvider.tsx      # Context provider for managing gene data globally
  /utils
    utils.ts                  # Utility functions for processing and color mapping
  App.tsx                     # Main App component
  index.tsx                   # Entry point to render the React app
----------------------------------------------------

# Key Components

# TableDisplay.tsx

    *Displays the gene data in a table format using MantineReactTable. The table allows users to select rows to view detailed gene information in the form of charts.*

# ChromosomeGeneLengths.tsx

*Uses ECharts to display gene lengths on chromosomes. It filters the data by chromosome and generates a scatter plot showing the lengths of genes on the selected chromosome.*

# GeneDataProvider.tsx

*A context provider that fetches and manages gene data globally across the app. It provides the gene data to all child components using useContext.*

# utils.ts

*Contains utility functions for color mapping, such as getBiotypeColor and getChromosomeColor, to apply colors dynamically based on the data.*
----------------------------------------------------

# Setup for Data

The main dataset used in this app is **Human genes** dataset (csv file)

Ensure that the gene data is structured as follows:

[
  {
    "Ensembl": "ENSG000001",
    "Gene symbol": "GPR82",
    "Name": "G protein-coupled receptor 82 [Source:HGNC Symbol;Acc:HGNC:4533]",
    "Biotype": "protein_coding",
    "Chromosome": "1",
    "Seq region start": "1000",
    "Seq region end": "2000"
  }
]
----------------------------------------------------

# Dependencies

The project uses the following major dependencies:

1. react: The core React library.

2. typescript: The TypeScript language to add type safety.

3. vite: A fast build tool and development server.

4. @mantine/core: UI components from Mantine.

5. echarts: The charting library used to render the visualizations.

6. react-context-api: For managing global state.

**To install the dependencies mentioned above with npm:**

`npm install react @mantine/core echarts vite`
----------------------------------------------------


