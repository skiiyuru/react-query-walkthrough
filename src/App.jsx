import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import "./App.css"
import Characters from "./components/Characters.jsx"
import Posts from "./components/Posts"

const modules = [
  {
    label: "Customizations & Search",
    content: (
      <div>
        <h2>💫Star Wars💫</h2>
        <Characters />
      </div>
    ),
  },
  {
    label: "Dependent Queries",
    content: (
      <div>
        <h2>✍️ Blog Posts ✍️</h2>
        <Posts />
      </div>
    ),
  },
]

const App = () => {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <div className="App">
      <h1>⚡React Query Modules⚡</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
        }}
      >
        {modules.map(({ label }, idx) => (
          <button key={idx} onClick={() => setCurrentPage(idx)}>
            {label}
          </button>
        ))}
      </div>
      <hr />
      {modules[currentPage].content}
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

export default App
