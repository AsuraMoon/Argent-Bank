import React from 'react'
import { userDatas } from '../../services/userDatas'
import { useDispatch, useSelector } from 'react-redux'
import { profileFirstName, profileLastName, profileError } from './profileSlice'
import UserHeader from '../../components/userHeader'
import ProfileAccounts from '../../components/ProfileAccounts'
import axios from 'axios'

// Récupération du jeton d'authentification depuis le stockage local.
const token = localStorage.getItem('token')

// Si un jeton est présent, configure les en-têtes Axios pour inclure le jeton dans les requêtes.
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * Composant - Profil utilisateur
 * @returns {React.ReactElement} JSX.Element - Composant utilisateur
 */
function Profile() {
  // Récupération de la fonction dispatch depuis le hook useDispatch de react-redux.
  const dispatch = useDispatch()

  // Récupération de l'état "isRemember" depuis le store Redux.
  const { isRemember } = useSelector((state) => state.login)

  // Appel du service userDatas pour récupérer les informations utilisateur.
  userDatas()
    .then((data) => {
      // Mise à jour des prénoms dans le store Redux.
      dispatch(profileFirstName(data.body.firstName))
      dispatch(profileLastName(data.body.lastName))

      // Stockage des prénoms dans le stockage local si "Se souvenir de moi" est activé.
      if (isRemember) {
        localStorage.setItem('firstName', data.body.firstName)
        localStorage.setItem('lastName', data.body.lastName)
        localStorage.setItem('saving', data.body.saving)
        localStorage.setItem('checking', data.body.checking)
        localStorage.setItem('credit', data.body.credit)
      } else {
        // Suppression des prénoms du stockage local si "Se souvenir de moi" n'est pas activé.
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
      }
    })
    .catch((error) => dispatch(profileError(error.response.data.message)))

  // Rendu du composant Profile.
  return (
    <main className="main background-dark">
      {/* Inclusion du composant d'en-tête utilisateur */}
      <UserHeader />

      {/* Inclusion du composant de comptes utilisateur */}
      <ProfileAccounts />
    </main>
  )
}

export default Profile
