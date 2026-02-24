export const createConditionNodeConfig = ({
  id,
  expression,
  handleExpressionChange,
}) => ({
  title: 'Condition',
  inputs: [{ id: `${id}-input` }],
  outputs: [{ id: `${id}-true` }, { id: `${id}-false`, style: { top: '70%' } }],
  renderContent: () => (
    <label>
      If:
      <input type="text" value={expression} onChange={handleExpressionChange} />
    </label>
  ),
});
