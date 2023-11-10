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
 * Component - SingIn
 * @returns {React.ReactElement} JSX.Element - SingIn component
 */

function SingIn() {
  const { isLoading, error, isRemember } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [credientials, setCredientials] = useState({
    email: '',
    password: '',
  })

  function handelChange({ currentTarget }) {
    const { value, name } = currentTarget
    setCredientials({
      ...credientials,
      [name]: value,
    })
  }

  async function handelSubmit(e) {
    e.preventDefault()

    dispatch(logingPending())
    try {
      const isAuth = await userLogin(credientials)

      if (isRemember) {
        localStorage.setItem('token', isAuth.body.token)
      } else {
        localStorage.removeItem('token')
      }

      dispatch(logingSuccess())
      navigate('/profilePage/Profile')
    } catch (error) {
      console.log(error)
      dispatch(logingError(error.response.data.message))
    }
  }

  return (
    <>
      <main className="main bg-dark">
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
