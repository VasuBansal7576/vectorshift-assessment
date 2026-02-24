import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './BaseNode.css';

export const BaseNode = ({
  id,
  data,
  config,
}) => {
  const deleteNodeById = useStore((state) => state.deleteNodeById);
  const {
    title,
    inputs = [],
    outputs = [],
    renderContent = () => null,
  } = config;

  return (
    <div className="base-node">
      <button
        type="button"
        className="base-node__delete"
        aria-label="Delete node"
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          deleteNodeById(id);
        }}
      >
        ×
      </button>
      {inputs.map((handle, index) => (
        <Handle
          key={handle.id || `input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `${id}-input-${index}`}
          style={handle.style}
        />
      ))}

      <div className="base-node__header">
        <span className="base-node__title">{title}</span>
      </div>

      <div className="base-node__content">{renderContent({ id, data })}</div>

      {outputs.map((handle, index) => (
        <Handle
          key={handle.id || `output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `${id}-output-${index}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};
