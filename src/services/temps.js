import axios from 'axios'
const baseUrl = '/temps'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const post = (reading) => axios.post(baseUrl, reading).then(res => res.data)

export default { getAll, post }
