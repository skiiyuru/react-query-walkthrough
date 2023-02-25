import apiClient from "./http-common.js"
import "./App.css"
import { useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["people"],
    queryFn: () => {
      // if (true) {
      //   throw new Error()
      // }
      return apiClient.get("/people").then((res) => res.data.results)
    },
  })

  const displayedList = data?.map((i) => <p key={i.name}>{i.name}</p>)

  let content = displayedList

  if (isLoading) {
    content = <h3>Loading...</h3>
  } else if (error) {
    content = <h3>{`😓 Something went wrong: ${error.message}`}</h3>
  }

  return (
    <div className="App">
      <h1>💫Star Wars💫</h1>
      {content}
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

export default App
