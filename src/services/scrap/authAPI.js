import { URL_LOGIN } from '../../config'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

// Fonction asynchrone pour gérer le processus d'authentification.
export async function login(credentials) {
  try {
    // Appel à l'API pour l'authentification avec les identifiants fournis.
    const response = await axios.post(URL_LOGIN, credentials)

    // Configuration des en-têtes Axios avec le token d'authentification obtenu.
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + response.data.body.token

    // Stockage du token dans le stockage local.
    const { token } = response.data.body
    localStorage.setItem('authToken', token)

    // Vérification de l'authenticité après l'authentification.
    if (isAuthenticated()) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Gestion des erreurs en lançant une nouvelle erreur.
    throw new Error(error)
  }
}

// Fonction pour vérifier si l'utilisateur est actuellement authentifié.
function isAuthenticated() {
  // Récupération du token depuis le stockage local.
  const token = window.localStorage.getItem('authToken')

  // Vérification de l'expiration du token.
  if (token) {
    const { exp } = jwtDecode(token)

    // Comparaison avec le temps actuel.
    if (exp * 1000 > new Date().getTime()) {
      return true
    }
  }
  return false
}

// Objet contenant des fonctions liées à l'authentification.
const authAPI = {
  isAuthenticated,
}

// Export de l'objet pour être utilisé ailleurs dans le code.
export default authAPI
