import pageGenerator from './generators/page/index.js'
import componentGenerator from './generators/component/index.js'
import layerGenerator from './generators/layer/index.js'

export default function (plop) {
  plop.setGenerator('layer', layerGenerator)
  plop.setGenerator('page', pageGenerator)
  plop.setGenerator('component', componentGenerator)
}
