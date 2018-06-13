import Axios from 'axios'
import router from '@/router'
import config from '../config'

export default {
  async authenticate (credentials) {
    try {
      const response = await Axios.post(`${config.httpEndPoint}/api/v1/auth`, credentials)
      return response
    } catch (e) {
      throw e
    }
  },

  async signup (credentials) {
    try {
      const response = await Axios.post(`${config.httpEndPoint}/api/v1/signup`, credentials)
      return response
    } catch (e) {
      throw e
    }
  },

  signout (context, redirect) {
    context.$cookie.delete('token')
    context.$cookie.delete('user_id')
    context.$cookie.delete('username')
    context.$cookie.delete('role')
    config.validLogin = false

    if (redirect) router.push(redirect)
  },

  checkAuthentication () {
    var cookie = document.cookie
    var token = cookie.split('token=')
    return (token.length > 1 && !!token[1])    
  },

  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
