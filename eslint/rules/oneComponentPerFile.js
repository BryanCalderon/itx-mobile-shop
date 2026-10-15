/**
 * Allows a single React component per file. A component is a top-level function, declared or
 * assigned to a variable, whose name starts with an uppercase letter and that renders JSX.
 *
 * @type {import('eslint').Rule.RuleModule}
 */
export const oneComponentPerFile = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Allow a single React component per file' },
    messages: {
      multipleComponents:
        'Only one component per file: move "{{name}}" to its own file, next to its styles and tests.',
    },
    schema: [],
  },
  create(context) {
    /** Top-level PascalCase functions, by node */
    const candidates = new Map()
    const components = new Set()

    function addCandidate(name, functionNode) {
      if (name && /^[A-Z]/.test(name)) {
        candidates.set(functionNode, name)
      }
    }

    function topLevelStatement(node) {
      const parent = node.parent
      return parent?.type === 'ExportNamedDeclaration' ||
        parent?.type === 'ExportDefaultDeclaration'
        ? parent.parent
        : parent
    }

    function markRenderingFunction(jsxNode) {
      const renderingFunction = context.sourceCode
        .getAncestors(jsxNode)
        .find((ancestor) => candidates.has(ancestor))
      if (renderingFunction) {
        components.add(renderingFunction)
      }
    }

    return {
      FunctionDeclaration(node) {
        if (topLevelStatement(node)?.type === 'Program') {
          addCandidate(node.id?.name, node)
        }
      },
      VariableDeclarator(node) {
        const isFunction =
          node.init?.type === 'ArrowFunctionExpression' || node.init?.type === 'FunctionExpression'
        if (isFunction && topLevelStatement(node.parent)?.type === 'Program') {
          addCandidate(node.id.type === 'Identifier' ? node.id.name : undefined, node.init)
        }
      },
      JSXElement: markRenderingFunction,
      JSXFragment: markRenderingFunction,
      'Program:exit'() {
        ;[...components].slice(1).forEach((component) => {
          context.report({
            node: component,
            messageId: 'multipleComponents',
            data: { name: candidates.get(component) },
          })
        })
      },
    }
  },
}
