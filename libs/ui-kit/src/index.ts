export * from './lib/ui-kit';
import "./lib/styles/index.scss"
import components from "./lib/components"
import functions from "./lib/functions"
import utils from "./lib/utils"

const Uik = {
  ...components,
  ...functions,
  utils
}

export default Uik