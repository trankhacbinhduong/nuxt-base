export default {
  description: 'Add new component',
  prompts: useComponentRegistrationPrompts(),
  actions: useComponentRegistrationActions,
}

function useComponentRegistrationPrompts() {
  return [
    {
      type: 'checkbox',
      name: 'componentTypes',
      message: 'This is a base component?',
      choices: [{ name: 'Yes', value: true }],
    },
    {
      type: 'input',
      name: 'component',
      message: 'New component',
      validate: (component) => {
        return isValidComponent(component) || 'Component must be  a `.vue` file and kebab-case'
      },
    },
  ]
}

function useComponentRegistrationActions({
  component,
  componentTypes: [isBaseComponent],
}) {
  const baseComponentPrefix = 'base'

  const componentName = isBaseComponent
    ? `${baseComponentPrefix}/${component.split('.vue')[0]}`
    : component.split('.vue')[0]

  const componentPath = isBaseComponent
    ? `components/${baseComponentPrefix}/${component}`
    : `components/${component}`

  return [
    {
      type: 'add',
      data: { componentName },
      path: componentPath,
      templateFile: './generators/component/template.hbs',
    },
  ]
}

function isValidComponent(component) {
  const regex = /^([a-z0-9]+(-[a-z0-9]+)*)(\/[a-z0-9]+(-[a-z0-9]+)*)*\.vue$/
  return regex.test(component)
}
