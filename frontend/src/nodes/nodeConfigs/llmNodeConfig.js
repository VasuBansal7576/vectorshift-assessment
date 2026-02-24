export const createLLMNodeConfig = ({ id }) => ({
  title: 'LLM',
  inputs: [
    { id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
  ],
  outputs: [{ id: `${id}-response` }],
  renderContent: () => <span>This is a LLM.</span>,
});
