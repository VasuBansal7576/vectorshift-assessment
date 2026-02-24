export const createLoggerNodeConfig = ({
  id,
  level,
  handleLevelChange,
}) => ({
  title: 'Logger',
  inputs: [{ id: `${id}-input` }],
  outputs: [{ id: `${id}-output` }],
  renderContent: () => (
    <label>
      Level:
      <select value={level} onChange={handleLevelChange}>
        <option value="info">info</option>
        <option value="warn">warn</option>
        <option value="error">error</option>
      </select>
    </label>
  ),
});
