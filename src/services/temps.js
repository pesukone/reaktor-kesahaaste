import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/temps'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const post = (reading) => axios.post(baseUrl, reading).then(res => res.data)

export default { getAll, post }
