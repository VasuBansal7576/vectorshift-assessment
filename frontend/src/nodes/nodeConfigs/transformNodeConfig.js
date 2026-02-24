export const createTransformNodeConfig = ({
  id,
  operation,
  handleOperationChange,
}) => ({
  title: 'Transform',
  inputs: [{ id: `${id}-input` }],
  outputs: [{ id: `${id}-output` }],
  renderContent: () => (
    <label>
      Op:
      <input type="text" value={operation} onChange={handleOperationChange} />
    </label>
  ),
});
