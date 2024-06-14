import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logingSuccess } from '../pages/loginPage/loginSlice'

/**
 * Composant - PrivateRoute
 * Ce composant gère la navigation privée en vérifiant l'authentification de l'utilisateur.
 */

function PrivateRoute() {
  // Récupération de la fonction dispatch depuis le hook useDispatch de react-redux.
  const dispatch = useDispatch()

  // Récupération du jeton d'authentification depuis le stockage local.
  const token = localStorage.getItem('token')

  // Garde l'utilisateur connecté lors du rafraîchissement de la page.
  if (token) {
    // Si un jeton est présent, déclenche l'action de connexion réussie.
    dispatch(logingSuccess())
  }

  // Sélection de l'état d'authentification depuis le store Redux.
  const { isAuth } = useSelector((state) => state.login)

  // Renvoie le composant Outlet si l'utilisateur est authentifié, sinon redirige vers la page d'accueil.
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
