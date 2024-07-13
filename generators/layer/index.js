import { isValidRoute } from '../page/index.js'

export default {
  description: 'Add new layer',
  prompts: useLayerRegistrationPrompts(),
  actions: useLayerRegistrationActions,
}

function useLayerRegistrationPrompts() {
  return [
    {
      type: 'input',
      name: 'layer',
      message: 'New layer',
      validate: value => Boolean(value) || 'Layer name is required',
    },
    {
      type: 'input',
      name: 'route',
      message: 'Default route (default pages/index.vue)',
      validate: (route) => {
        if (!route) return true

        if (!isValidRoute(route)) {
          return 'Route must be  a `.vue` file and kebab-case'
        }

        return true
      },
    },
  ]
}

function useLayerRegistrationActions({ layer, route }) {
  const routeName = route ? route.split('.vue')[0] : 'index'
  const routePath = route ? `./layers/{{kebabCase layer}}/pages/${route}` : `./layers/{{kebabCase layer}}/pages/index.vue`

  return [
    {
      type: 'add',
      data: { layer },
      path: './layers/{{kebabCase layer}}/nuxt.config.ts',
      template: 'export default defineNuxtConfig({})',
    },
    {
      type: 'add',
      data: { routeName },
      path: routePath,
      templateFile: './generators/page/template.hbs',
    },
    {
      type: 'append',
      path: './nuxt.config.ts',
      pattern: /(extends: \[)/,
      template: `\t\t'./layers/{{layer}}',`,
    },
  ]
}
