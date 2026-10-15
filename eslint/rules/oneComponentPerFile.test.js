import { RuleTester } from 'eslint'
import tseslint from 'typescript-eslint'
import { afterAll, describe, it } from 'vitest'
import { oneComponentPerFile } from './oneComponentPerFile.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

ruleTester.run('one-component-per-file', oneComponentPerFile, {
  valid: [
    'export function Card() { return <div /> }',
    'export const Card = () => <div />',
    'export function Card() { return <Title /> }\nfunction formatTitle(title) { return title.trim() }',
    'export function Card() { const Item = () => <li />; return <ul><Item /></ul> }',
    'export function Card() { return <div /> }\nexport const CARD_SIZE = 3',
  ],
  invalid: [
    {
      code: 'export function Card() { return <div /> }\nexport function CardSkeleton() { return <div /> }',
      errors: [{ messageId: 'multipleComponents', data: { name: 'CardSkeleton' } }],
    },
    {
      code: 'export const Card = () => <div />\nconst Badge = () => <span />\nconst Tag = () => <></>',
      errors: [
        { messageId: 'multipleComponents', data: { name: 'Badge' } },
        { messageId: 'multipleComponents', data: { name: 'Tag' } },
      ],
    },
  ],
})
