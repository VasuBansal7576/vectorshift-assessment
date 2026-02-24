export const createDelayNodeConfig = ({
  id,
  delayMs,
  handleDelayChange,
}) => ({
  title: 'Delay',
  inputs: [{ id: `${id}-input` }],
  outputs: [{ id: `${id}-output` }],
  renderContent: () => (
    <label>
      Delay (ms):
      <input type="number" min="0" value={delayMs} onChange={handleDelayChange} />
    </label>
  ),
});
