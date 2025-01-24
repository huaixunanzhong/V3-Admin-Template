// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist', 'node_modules', 'public', 'build'],
  rules: {
    'no-console': 'warn',
  },
})
