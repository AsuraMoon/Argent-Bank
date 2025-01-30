import { Link } from "react-router-dom"

/**
 * ERROR PAGE
 * @returns {React.ReactElement} JSX.Element error page
 */
function Error() {
  return (
    <section className="error">
      <h1>Erreur 404</h1>
      <h2>Cette page est introuvable </h2>
      <Link to="/">
        <h3>Retour à la page d'accueil </h3>
      </Link>
    </section>
  )
}

export default Error
