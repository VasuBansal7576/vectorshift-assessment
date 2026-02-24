// textNode.js

import { useEffect, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';
import { createTextNodeConfig } from './nodeConfigs/textNodeConfig';
import {
  createVariableInputHandles,
  extractTemplateVariables,
} from './nodeConfigs/textNodeVariables';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    resizeTextarea();
  };

  useEffect(() => {
    resizeTextarea();
  }, [currText]);

  const variableNames = extractTemplateVariables(currText);
  const inputVariables = createVariableInputHandles(id, variableNames);

  const config = createTextNodeConfig({
    id,
    currText,
    handleTextChange,
    textareaRef,
    inputVariables,
  });

  return (
    <BaseNode
      id={id}
      data={data}
      config={config}
    />
  );
}
