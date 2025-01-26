from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import Any
from fastapi.responses import JSONResponse  # Import JSONResponse


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/gene-info/{symbol}")
async def get_gene_info(symbol: str):
    response = requests.get(f"http://mygene.info/v3/query?q=symbol:{symbol}")
    return response.json()


# @app.get("/pca")
# async def fetch_pca_data():
#     url = "https://gtexportal.org/api/v2/expression/expressionPca"
    
#     # Send GET request to GTEx PCA endpoint
#     try:
#         response = requests.get(url)
#         response.raise_for_status()  # Raise an error for bad status codes
#         data = response.json()  # Parse the JSON response
#         return JSONResponse(content=data)
#     except requests.exceptions.RequestException as e:
#         return JSONResponse(status_code=500, content={"message": f"Error fetching data: {str(e)}"})
    
    
# @app.get("/gene/{gene_id}")
# async def get_gene_data(gene_id: int):
#     url = f"https://mygene.info/v3/gene/{gene_id}"
#     response = requests.get(url)
    
#     # Check if the request was successful
#     if response.status_code == 200:
#         data = response.json()
        
#         # Just return the keys of the data
#         keys = list(data.keys())
#         return JSONResponse(content={"keys": keys})
    
#     return JSONResponse(content={"error": "Failed to fetch data"}, status_code=500)