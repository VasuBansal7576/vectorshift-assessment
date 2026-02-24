// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createOutputNodeConfig } from './nodeConfigs/outputNodeConfig';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const config = createOutputNodeConfig({
    id,
    currName,
    outputType,
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
