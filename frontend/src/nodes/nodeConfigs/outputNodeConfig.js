export const createOutputNodeConfig = ({
  id,
  currName,
  outputType,
  handleNameChange,
  handleTypeChange,
}) => ({
  title: 'Output',
  inputs: [{ id: `${id}-value` }],
  outputs: [],
  renderContent: () => (
    <>
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </>
  ),
});
