import Axios from 'axios'
import config from '../config'
import AuthenticationServiceClient  from './AuthenticationServiceClient'
import Utility from './Utility'

export default {
  get (context) {
    return Axios.get(`${config.httpEndPoint}/api/v1/users`, {
      headers: { 'Authorization': AuthenticationServiceClient.getAuthenticationHeader(context) },
      params: { user_id: context.$cookie.get('user_id') }
    });
  },
  remove (context, user) {
    return Axios.delete(`${config.httpEndPoint}/api/v1/user`, {
      headers: { 'Authorization': AuthenticationServiceClient.getAuthenticationHeader(context) },
      params: {
         user_id: context.$cookie.get('user_id'),
         _id: user._id
        }
    });
  }
}
