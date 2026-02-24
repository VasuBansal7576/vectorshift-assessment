import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createLoggerNodeConfig } from './nodeConfigs/loggerNodeConfig';

export const LoggerNode = ({ id, data }) => {
  const [level, setLevel] = useState(data?.level || 'info');

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const config = createLoggerNodeConfig({
    id,
    level,
    handleLevelChange,
  });

  return <BaseNode id={id} data={data} config={config} />;
};
