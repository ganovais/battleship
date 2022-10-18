import axios from "axios";

const api = axios.create({
   baseURL: "https://backend-battleship.herokuapp.com/"
})

export default api;