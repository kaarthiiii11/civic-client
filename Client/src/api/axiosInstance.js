
import axios from 'axios'

const axiosInstance = axios.create({
  // Render backend URL
  baseURL: import.meta.env.VITE_API_URL || 'https://civic-server-5gx0.onrender.com',
  timeout: 5000,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        console.log('Unauthorised access - redirect to login page')
      } else if (status === 404) {
        console.log('API not found')
      } else if (status === 500) {
        console.log('Something went wrong... try again later')
      }
    } else if (error.request) {
      console.log('No response from server - check your backend connection')
    } else {
      console.log('Error ' + error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
