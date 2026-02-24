const VALID_JS_IDENTIFIER_REGEX = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const TEMPLATE_VARIABLE_REGEX = /\{\{\s*([^{}]+?)\s*\}\}/g;

export const extractTemplateVariables = (text = '') => {
  const uniqueVariables = new Set();
  let match = TEMPLATE_VARIABLE_REGEX.exec(text);

  while (match) {
    const candidate = match[1].trim();

    if (VALID_JS_IDENTIFIER_REGEX.test(candidate)) {
      uniqueVariables.add(candidate);
    }

    match = TEMPLATE_VARIABLE_REGEX.exec(text);
  }

  return Array.from(uniqueVariables);
};

export const createVariableInputHandles = (id, variableNames = []) => {
  const total = variableNames.length;

  return variableNames.map((variableName, index) => ({
    id: `${id}-${variableName}`,
    style: {
      top: `${((index + 1) / (total + 1)) * 100}%`,
    },
  }));
};
