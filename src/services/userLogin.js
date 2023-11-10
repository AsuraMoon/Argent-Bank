import axios from 'axios'
import { URL_LOGIN } from '../config'

/**
 * Function to get user datas login
 * @param {Objet} credientials user's credentials
 * @param {String} credientials.email user's email
 * @param {String} credientials.password user's password
 * @returns {Promise<any>} Promise with user datas
 */

export async function userLogin(credientials) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(URL_LOGIN, credientials)
      const token = res.data.body.token
      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      else delete axios.defaults.headers.common['Authorization']
      resolve(res.data)
    } catch (error) {
      reject(error)
    }
  })
}

/*
export async function UserLogin(credientials) {
  const dispatch = useDispatch()
  const { isLoading, isAuth, error, isRemember } = useSelector(
    (state) => state.login
  )
  try {
    dispatch(logingPending()) // Start request
    // Check credentials and get jwt
    const responseLogin = await axios.post(URL_LOGIN, credientials)
    const token = responseLogin.data.body.token
    // Remember is checked
    if (isRemember) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
    // Set Axios token
    setAuthorizationToken(token)
    dispatch(logingSuccess()) // End request
    //dispatch(notificationSend({ icon: "link", type: "success", message: "You are connected" }))// Notif
    //dispatch({ type: AUTH_LOGIN, payload: {token} })
    //const responseProfile = await axios.post('/user/profile')
    //const user = responseProfile.data.body
    //dispatch({ type: AUTH_SET_USER, payload: {user} })

    if (isAuth.status === 400 || isAuth.status === 500) {
      return dispatch(logingError(isAuth.message))
    }
  } catch (error) {
    console.log(error)
    dispatch(logingSuccess()) // End request
    dispatch(logingError(error.response.data.message))
  }
}

function setAuthorizationToken(token) {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}
*/
