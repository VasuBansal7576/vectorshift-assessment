from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from .graph_utils import is_dag_kahn
except ImportError:
    from graph_utils import is_dag_kahn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


class PipelineParseRequest(BaseModel):
    nodes: list[dict]
    edges: list[dict]


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelineParseRequest):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    is_dag = is_dag_kahn(payload.nodes, payload.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
