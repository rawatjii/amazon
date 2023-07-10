import axios from "axios";

const instance = axios.create({
    baseURL: 'https://clone-17e54-default-rtdb.firebaseio.com/',
})

export default instance;