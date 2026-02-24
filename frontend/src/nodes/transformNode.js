import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createTransformNodeConfig } from './nodeConfigs/transformNodeConfig';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'toUpperCase');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const config = createTransformNodeConfig({
    id,
    operation,
    handleOperationChange,
  });

  return <BaseNode id={id} data={data} config={config} />;
};
