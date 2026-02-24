import {
  createVariableInputHandles,
  extractTemplateVariables,
} from './textNodeVariables';

describe('extractTemplateVariables', () => {
  test('extracts valid JS variable names inside {{ variable }} patterns', () => {
    expect(
      extractTemplateVariables('Hello {{ userName }} and {{count}}')
    ).toEqual(['userName', 'count']);
  });

  test('returns unique variable names only', () => {
    expect(
      extractTemplateVariables('{{ user }} {{user}} {{  user  }}')
    ).toEqual(['user']);
  });

  test('ignores invalid variable candidates', () => {
    expect(
      extractTemplateVariables(
        '{{ 123abc }} {{ first-name }} {{ user.name }} {{ valid_name }} {{ $ok }} {{ _alsoOk }}'
      )
    ).toEqual(['valid_name', '$ok', '_alsoOk']);
  });

  test('returns empty array when there are no valid template variables', () => {
    expect(extractTemplateVariables('plain text {{ }} {{ not valid! }}')).toEqual(
      []
    );
  });

  test('updates output when variables are removed from text', () => {
    const withVariables = extractTemplateVariables('{{ one }} {{ two }}');
    const afterRemoval = extractTemplateVariables('{{ two }}');

    expect(withVariables).toEqual(['one', 'two']);
    expect(afterRemoval).toEqual(['two']);
  });
});

describe('createVariableInputHandles', () => {
  test('creates one handle per variable with stable ids and distinct positions', () => {
    const handles = createVariableInputHandles('text-1', ['foo', 'bar']);

    expect(handles).toEqual([
      { id: 'text-1-foo', style: { top: '33.33333333333333%' } },
      { id: 'text-1-bar', style: { top: '66.66666666666666%' } },
    ]);
  });

  test('returns no handles when there are no variables', () => {
    expect(createVariableInputHandles('text-1', [])).toEqual([]);
  });
});
