import pageGenerator from './generators/page/index.js'

export default function (plop) {
  plop.setGenerator('page', pageGenerator)
}
