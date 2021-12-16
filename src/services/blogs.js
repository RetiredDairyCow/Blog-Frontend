import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const authHeader = {
    headers: {'Authorization' : `${token}`}
  }
  
  const request = await axios.post(baseUrl, newBlog, authHeader)
  return request.data
}
const exportThis = {getAll, create, setToken}

export default exportThis