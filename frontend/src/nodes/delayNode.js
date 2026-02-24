import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createDelayNodeConfig } from './nodeConfigs/delayNodeConfig';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || 1000);

  const handleDelayChange = (e) => {
    setDelayMs(e.target.value);
  };

  const config = createDelayNodeConfig({
    id,
    delayMs,
    handleDelayChange,
  });

  return <BaseNode id={id} data={data} config={config} />;
};
