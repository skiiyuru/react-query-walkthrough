import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./App.css"
import Characters from "./components/Characters.jsx"

const App = () => {
  return (
    <div className="App">
      <h1>💫Star Wars💫</h1>
      <Characters />
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

export default App
