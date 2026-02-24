import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createAPINodeConfig } from './nodeConfigs/apiNodeConfig';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [endpoint, setEndpoint] = useState(data?.endpoint || '/api/resource');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value);
  };

  const config = createAPINodeConfig({
    id,
    method,
    endpoint,
    handleMethodChange,
    handleEndpointChange,
  });

  return <BaseNode id={id} data={data} config={config} />;
};
