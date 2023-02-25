import { useCharacters } from "./Characters"

const Summary = () => {
  const { data } = useCharacters()
  return <h3>Total: {data?.length}</h3>
}

export default Summary
