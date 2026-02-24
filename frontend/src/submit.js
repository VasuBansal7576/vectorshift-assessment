// submit.js

import { useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const submitSelector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const clearSelector = (state) => ({
  clearCanvas: state.clearCanvas,
});

export const useSubmitPipeline = () => {
  const { nodes, edges } = useStore(submitSelector, shallow);

  return useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      alert(
        `Number of nodes: ${result.num_nodes}\n` +
          `Number of edges: ${result.num_edges}\n` +
          `Is DAG: ${result.is_dag}`
      );
    } catch (error) {
      alert(`Failed to parse pipeline: ${error.message}`);
    }
  }, [nodes, edges]);
};

export const SubmitButton = () => {
  const { clearCanvas } = useStore(clearSelector, shallow);
  const handleSubmit = useSubmitPipeline();

  return (
    <div className="submit-actions">
      <button type="button" className="btn btn--secondary" onClick={clearCanvas}>
        Clear Canvas
      </button>
      <button type="button" className="btn btn--primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
