export default {
  description: 'Add new page',
  prompts: useRouteRegistrationPrompts(),
  actions: useRouteRegistrationActions,
}

function useRouteRegistrationPrompts() {
  return [
    {
      type: 'input',
      name: 'route',
      message: 'New route (default pages/index.vue)',
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

function useRouteRegistrationActions({ route }) {
  const routeName = route ? route.split('.vue')[0] : 'index'
  const routePath = route ? `pages/${route}` : 'pages/index.vue'
  return [
    {
      type: 'add',
      data: { routeName },
      path: routePath,
      templateFile: './generators/page/template.hbs',
    },
  ]
}

function isValidRoute(route) {
  const regex = /^(([a-z0-9]+(-[a-z0-9]+)*)|(\[[^\]]+\]))+(\/(([a-z0-9]+(-[a-z0-9]+)*)|(\[[^\]]+\])))*\.vue$/
  return regex.test(route)
}
