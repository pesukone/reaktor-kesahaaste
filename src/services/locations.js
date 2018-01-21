import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/locations'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const get = (id) => axios.get(`${baseUrl}/${id}`).then(res => res.data)

export default { getAll, get }
