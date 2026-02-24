// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
  } from 'reactflow';

const PIPELINE_STORAGE_KEY = 'pipeline_state';

const deriveNodeIDs = (nodes = []) => {
  return nodes.reduce((acc, node) => {
    if (!node?.id || typeof node.id !== 'string') {
      return acc;
    }

    const separatorIndex = node.id.lastIndexOf('-');
    if (separatorIndex <= 0) {
      return acc;
    }

    const nodeType = node.id.slice(0, separatorIndex);
    const parsedIndex = Number(node.id.slice(separatorIndex + 1));

    if (!Number.isFinite(parsedIndex)) {
      return acc;
    }

    acc[nodeType] = Math.max(acc[nodeType] || 0, parsedIndex);
    return acc;
  }, {});
};

export const useStore = create((set, get) => ({
    nodeIDs: {},
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(
          {
            ...connection,
            type: 'smoothstep',
            animated: true,
            style: {
              stroke: '#FACC15',
              strokeWidth: 2,
            },
          },
          get().edges
        ),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    clearCanvas: () => {
      set({
        nodes: [],
        edges: [],
        nodeIDs: {},
      });
    },
    deleteNodesById: (nodeIds) => {
      const nodeIdSet = new Set(nodeIds);

      set({
        nodes: get().nodes.filter((node) => !nodeIdSet.has(node.id)),
        edges: get().edges.filter(
          (edge) => !nodeIdSet.has(edge.source) && !nodeIdSet.has(edge.target)
        ),
      });
    },
    deleteNodeById: (nodeId) => {
      get().deleteNodesById([nodeId]);
    },
    savePipelineToStorage: () => {
      const { nodes, edges } = get();
      localStorage.setItem(
        PIPELINE_STORAGE_KEY,
        JSON.stringify({ nodes, edges })
      );
    },
    loadPipelineFromStorage: () => {
      const raw = localStorage.getItem(PIPELINE_STORAGE_KEY);
      if (!raw) {
        return;
      }

      try {
        const parsed = JSON.parse(raw);
        const nodes = Array.isArray(parsed?.nodes) ? parsed.nodes : [];
        const edges = Array.isArray(parsed?.edges) ? parsed.edges : [];

        set({
          nodes,
          edges,
          nodeIDs: deriveNodeIDs(nodes),
        });
      } catch (_error) {
        localStorage.removeItem(PIPELINE_STORAGE_KEY);
      }
    },
  }));
