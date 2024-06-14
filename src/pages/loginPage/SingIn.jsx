import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import { userLogin } from '../../services/userLogin'
import { useSelector, useDispatch } from 'react-redux'
import {
  logingPending,
  logingSuccess,
  logingError,
  logingRemember,
} from './loginSlice'

/**
 * Composant - SingIn
 * @returns {React.ReactElement} JSX.Element - Composant SingIn
 */

function SingIn() {
  // Récupération des informations d'authentification depuis le store Redux.
  const { isLoading, error, isRemember } = useSelector((state) => state.login)

  // Récupération de la fonction dispatch depuis le hook useDispatch de react-redux.
  const dispatch = useDispatch()

  // Récupération de la fonction de navigation depuis react-router-dom.
  let navigate = useNavigate()

  // État local pour stocker les informations d'identification (email et mot de passe).
  const [credientials, setCredientials] = useState({
    email: '',
    password: '',
  })

  // Fonction pour gérer le changement de valeur dans les champs du formulaire.
  function handelChange({ currentTarget }) {
    const { value, name } = currentTarget
    setCredientials({
      ...credientials,
      [name]: value,
    })
  }

  // Fonction pour gérer la soumission du formulaire.
  async function handelSubmit(e) {
    e.preventDefault()

    // Déclenchement de l'action indiquant le début du processus d'authentification.
    dispatch(logingPending())
    try {
      // Appel de la fonction de connexion utilisateur.
      const isAuth = await userLogin(credientials)

      // Stockage du jeton dans le stockage local si "Se souvenir de moi" est activé.
      if (isRemember) {
        localStorage.setItem('token', isAuth.body.token)
      } else {
        localStorage.removeItem('token')
      }

      // Déclenchement de l'action indiquant la réussite de l'authentification.
      dispatch(logingSuccess())
      
      // Redirection vers la page du profil.
      navigate('/profilePage/Profile')
    } catch (error) {
      console.log(error)
      
      // Déclenchement de l'action indiquant une erreur d'authentification.
      dispatch(logingError(error.response.data.message))
    }
  }

  // Rendu du composant SingIn.
  return (
    <>
      <main className="main background-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handelSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                defaultChecked={isRemember}
                onChange={() => dispatch(logingRemember(!isRemember))}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button type="submit" variant="success" className="sign-in-button">
              Sign In
            </Button>
            {isLoading && (
              <div className="spinner-border text-success mt-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  )
}

export default SingIn
