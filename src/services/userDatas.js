import axios from 'axios'
import { URL_PROFILE } from '../config'

/**
 * Function to get user datas profile
 * @returns {Promise<any>} Promise with user datas
 */
export async function userDatas() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(URL_PROFILE)
      resolve(res.data)
    } catch (error) {
      reject(error)
    }
  })
}
