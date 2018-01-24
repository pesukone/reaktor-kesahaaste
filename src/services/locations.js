import axios from 'axios'
const baseUrl = '/locations'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const get = (id) => axios.get(`${baseUrl}/${id}`).then(res => res.data)

export default { getAll, get }
