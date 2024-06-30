import axios from "axios"
const baseUrl = "/api/users"

const getUsers = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default { getUsers, getUserById }
