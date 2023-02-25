import axios from "axios"

export default axios.create({
  baseURL: "https://swapi.dev/api/",
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
})
