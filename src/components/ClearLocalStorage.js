//@ts-check
import { useDispatch } from 'react-redux'
import { logingOut } from '../pages/loginPage/loginSlice'

/**
 * Composant - ClearLocalStorage
 * Ce composant est responsable de la suppression des données stockées localement.
 */

export function ClearLocalStorage() {
  // Récupération de la fonction dispatch depuis le hook useDispatch de react-redux.
  const dispatch = useDispatch()

  // Suppression des éléments stockés localement liés à l'authentification.
  localStorage.removeItem('token')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')

  // Appel de l'action logingOut à travers le dispatch pour déconnecter l'utilisateur.
  dispatch(logingOut())
}
