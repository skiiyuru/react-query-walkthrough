import axios from "axios"

export const { get, post } = axios.create({
  baseURL: "https://swapi.dev/api/",
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
})
