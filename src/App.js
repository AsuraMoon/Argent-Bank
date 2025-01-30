//@ts-check
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import store from './store'
import Header from './components/Header'
import Home from './pages/Home'
import SignIn from './pages/loginPage/SingIn'
import Footer from './components/Footer'
import Profile from './pages/profilePage/Profile'
import Error from './pages/Error'
import PrivateRoute from './components/PrivateRoute'
import { Provider } from 'react-redux'

/**
 *
 * @returns {React.ReactElement} JSX.Element - the user main page with API data
 */

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Argent-Bank" element={<Home />} />
            <Route path="/loginPage/signIn" element={<SignIn />} />
            <Route path="/profilePage/Profile" element={<PrivateRoute />}>
              <Route path="/profilePage/Profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>

        <Footer />
      </Router>
    </Provider>
  )
}

export default App
