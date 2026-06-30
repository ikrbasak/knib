import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  ignorePatterns: [],
  newlinesBetween: true,
  sortPackageJson: true,
  endOfLine: 'lf',
  arrowParens: 'always',
  insertFinalNewline: true,
  quoteProps: 'consistent',
  sortImports: {
    customGroups: [
      {
        groupName: 'src',
        elementNamePattern: ['@/**'],
      },
      {
        groupName: 'test',
        elementNamePattern: ['~/**'],
      },
    ],
    groups: [
      ['side_effect'],
      ['builtin'],
      ['external', 'type-external'],
      ['internal', 'type-internal'],
      ['parent', 'type-parent'],
      ['sibling', 'type-sibling'],
      ['index', 'type-index'],
      'unknown',
      ['src'],
      ['test'],
    ],
  },
});
