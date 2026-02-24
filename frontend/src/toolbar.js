// toolbar.js

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = ({ onNodeClickAdd }) => {
  return (
    <div className="pipeline-toolbar">
      <p className="pipeline-toolbar__eyebrow">Node Library</p>
      <h2 className="pipeline-toolbar__title">Components</h2>
      <div className="pipeline-toolbar__list">
        <DraggableNode type="customInput" label="Input" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="llm" label="LLM" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="customOutput" label="Output" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="text" label="Text" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="api" label="API" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="condition" label="Condition" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="delay" label="Delay" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="transform" label="Transform" onClickAdd={onNodeClickAdd} />
        <DraggableNode type="logger" label="Logger" onClickAdd={onNodeClickAdd} />
      </div>
    </div>
  );
};
