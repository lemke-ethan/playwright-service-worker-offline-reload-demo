import ReactDOM from "react-dom"
import { buildAppComponent } from "./App"

const App = buildAppComponent()
ReactDOM.render(<App />,
  document.getElementById("root")
)
