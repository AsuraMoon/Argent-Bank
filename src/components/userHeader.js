import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  profilePending,
  profileFirstName,
  profileLastName,
  profileError,
} from '../pages/profilePage/profileSlice'
import { userUpDate } from '../services/userUpDate'

/**
 * Composant de l'en-tête utilisateur
 * @returns {React.ReactElement} JSX.Element - composant UserHeader
 */

function UserHeader() {
  // Récupération de la fonction dispatch depuis le hook useDispatch de react-redux.
  const dispatch = useDispatch()

  // Récupération des prénoms stockés localement.
  const localStorageFirstName = localStorage.getItem('firstName')
  const localStorageLastName = localStorage.getItem('lastName')

  // Sélection des prénoms depuis le store Redux.
  const { firstName, lastName } = useSelector((state) => state.profile)

  // Effet déclenché lors du montage du composant pour mettre à jour les prénoms depuis le stockage local.
  useEffect(() => {
    if (localStorageFirstName && localStorageLastName) {
      dispatch(profileFirstName(localStorageFirstName))
      dispatch(profileLastName(localStorageLastName))
    }
  }, [dispatch, localStorageFirstName, localStorageLastName])

  // État local pour gérer l'affichage du formulaire d'édition.
  const [editButton, setEditButton] = useState('')

  // État local pour stocker les prénoms à éditer.
  const [userFirstLastName, setUserFirstLastName] = useState({
    firstName: '',
    lastName: '',
  })

  // Gestion du changement de valeur dans les champs du formulaire.
  function handelChange({ currentTarget }) {
    const { value, name } = currentTarget
    setUserFirstLastName({
      ...userFirstLastName,
      [name]: value,
    })
  }

  // Gestion du clic sur le bouton d'édition.
  function editNameButton(e) {
    e.preventDefault()
    setEditButton((current) => !current)
  }

  // Gestion de la soumission du formulaire d'édition.
  async function submitHandler(e) {
    e.preventDefault()
    dispatch(profilePending())
    try {
      // Appel de la fonction d'édition des informations utilisateur.
      const newUser = await userUpDate(userFirstLastName)
      
      // Mise à jour des prénoms dans le store Redux.
      dispatch(profileFirstName(newUser.body.firstName))
      dispatch(profileLastName(newUser.body.lastName))
      
      // Désactivation du mode d'édition.
      setEditButton((current) => !current)
    } catch (error) {
      // Gestion des erreurs lors de la mise à jour du profil.
      dispatch(profileError(error.response.data.message))
    }
  }

  // Rendu conditionnel basé sur l'état du mode d'édition.
  return (
    <>
      {!editButton ? (
        // Affichage du message de bienvenue et du bouton d'édition.
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName + ' ' + lastName} !
          </h1>
          <button onClick={editNameButton} className="edit-button">
            Edit Name
          </button>
        </div>
      ) : (
        // Affichage du formulaire d'édition.
        <div className="header">
          <h1>Welcome back</h1>
          <form className="editNameContent" onSubmit={submitHandler}>
            <div className="headerUserContentSave">
              <input
                className="InputfirstName"
                type="text"
                placeholder={firstName}
                name="firstName"
                onChange={handelChange}
                required
              />
              <button className="edit-button" type="submit">
                Save
              </button>
            </div>
            <div className="headerUserContentCancel">
              <input
                className="inputLastName"
                type="text"
                placeholder={lastName}
                name="lastName"
                onChange={handelChange}
                required
              />
              <button className="edit-button" onClick={editNameButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
export default UserHeader
