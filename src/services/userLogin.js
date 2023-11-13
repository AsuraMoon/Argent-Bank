import axios from 'axios'
import { URL_LOGIN } from '../config'

/**
 * Fonction pour obtenir les données de connexion de l'utilisateur.
 * @param {Object} credentials - Identifiants de l'utilisateur.
 * @param {String} credentials.email - Adresse e-mail de l'utilisateur.
 * @param {String} credentials.password - Mot de passe de l'utilisateur.
 * @returns {Promise<any>} - Promesse contenant les données de l'utilisateur.
 */
export async function userLogin(credentials) {
  return new Promise(async (resolve, reject) => {
    try {
      // Appel à l'API pour la connexion avec les identifiants fournis.
      const res = await axios.post(URL_LOGIN, credentials)
      
      // Récupération du token d'authentification.
      const token = res.data.body.token
      
      // Configuration des en-têtes Axios avec le token d'authentification, si disponible.
      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      else 
        delete axios.defaults.headers.common['Authorization']

      // Résolution de la promesse avec les données de l'utilisateur.
      resolve(res.data)
    } catch (error) {
      // Rejet de la promesse en cas d'erreur.
      reject(error)
    }
  })
}