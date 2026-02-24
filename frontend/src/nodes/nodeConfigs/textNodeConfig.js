export const createTextNodeConfig = ({
  id,
  currText,
  handleTextChange,
  textareaRef,
  inputVariables = [],
}) => ({
  title: 'Text',
  inputs: inputVariables,
  outputs: [{ id: `${id}-output` }],
  renderContent: () => (
    <label>
      Text:
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        rows={1}
      />
    </label>
  ),
});
