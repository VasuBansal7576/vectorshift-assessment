// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MarkerType,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { ConditionNode } from './nodes/conditionNode';
import { DelayNode } from './nodes/delayNode';
import { TransformNode } from './nodes/transformNode';
import { LoggerNode } from './nodes/loggerNode';

import 'reactflow/dist/style.css';
import './ui.css';

const gridSize = 24;
const proOptions = { hideAttribution: true };
const connectionLineStyle = { stroke: '#FACC15', strokeWidth: 2 };
const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: connectionLineStyle,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#FACC15',
  },
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  condition: ConditionNode,
  delay: DelayNode,
  transform: TransformNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  deleteNodesById: state.deleteNodesById,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ onReadyAddNodeByClick }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    deleteNodesById,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const addNodeAtPosition = useCallback(
    (type, position) => {
      if (!type || !position) {
        return false;
      }

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
      return true;
    },
    [getNodeID, addNode]
  );

  const addNodeAtViewportCenter = useCallback(
    (type) => {
      if (!reactFlowInstance || !reactFlowWrapper.current || !type) {
        return false;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: bounds.width / 2,
        y: bounds.height / 2,
      });

      return addNodeAtPosition(type, position);
    },
    [reactFlowInstance, addNodeAtPosition]
  );

  useEffect(() => {
    if (typeof onReadyAddNodeByClick !== 'function') {
      return undefined;
    }

    onReadyAddNodeByClick(() => addNodeAtViewportCenter);

    return () => {
      onReadyAddNodeByClick(() => () => false);
    };
  }, [onReadyAddNodeByClick, addNodeAtViewportCenter]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type || !reactFlowInstance) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        addNodeAtPosition(type, position);
      }
    },
    [reactFlowInstance, addNodeAtPosition]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodesDelete = useCallback(
    (deletedNodes) => {
      const nodeIds = deletedNodes.map((node) => node.id);
      deleteNodesById(nodeIds);
    },
    [deleteNodesById]
  );

  return (
    <div ref={reactFlowWrapper} className="pipeline-ui">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        connectionLineType={ConnectionLineType.SmoothStep}
        deleteKeyCode={['Delete', 'Backspace']}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="rgba(250, 250, 255, 0.05)"
          gap={gridSize}
          size={1}
        />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};
