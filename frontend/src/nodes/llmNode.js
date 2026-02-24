// llmNode.js

import { BaseNode } from './BaseNode';
import { createLLMNodeConfig } from './nodeConfigs/llmNodeConfig';

export const LLMNode = ({ id, data }) => {
  const config = createLLMNodeConfig({ id });

  return (
    <BaseNode
      id={id}
      data={data}
      config={config}
    />
  );
}
