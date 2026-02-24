import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createConditionNodeConfig } from './nodeConfigs/conditionNodeConfig';

export const ConditionNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || 'value > 0');

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };

  const config = createConditionNodeConfig({
    id,
    expression,
    handleExpressionChange,
  });

  return <BaseNode id={id} data={data} config={config} />;
};
