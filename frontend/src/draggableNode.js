// draggableNode.js

import './draggableNode.css';

export const DraggableNode = ({ type, label, onClickAdd }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.classList.add('draggable-node--dragging');
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.currentTarget.classList.remove('draggable-node--dragging');
  };

  const onClick = () => {
    if (typeof onClickAdd === 'function') {
      onClickAdd(type);
    }
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      draggable
    >
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};
