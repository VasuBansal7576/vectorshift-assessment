export const createAPINodeConfig = ({
  id,
  method,
  endpoint,
  handleMethodChange,
  handleEndpointChange,
}) => ({
  title: 'API',
  inputs: [{ id: `${id}-request` }],
  outputs: [{ id: `${id}-response` }],
  renderContent: () => (
    <>
      <label>
        Method:
        <select value={method} onChange={handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </label>
      <label>
        URL:
        <input type="text" value={endpoint} onChange={handleEndpointChange} />
      </label>
    </>
  ),
});
