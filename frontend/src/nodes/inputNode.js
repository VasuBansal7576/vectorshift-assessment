// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createInputNodeConfig } from './nodeConfigs/inputNodeConfig';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const config = createInputNodeConfig({
    id,
    currName,
    inputType,
    handleNameChange,
    handleTypeChange,
  });

  return (
    <BaseNode
      id={id}
      data={data}
      config={config}
    />
  );
}
