export const createInputNodeConfig = ({
  id,
  currName,
  inputType,
  handleNameChange,
  handleTypeChange,
}) => ({
  title: 'Input',
  inputs: [],
  outputs: [{ id: `${id}-value` }],
  renderContent: () => (
    <>
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </>
  ),
});
