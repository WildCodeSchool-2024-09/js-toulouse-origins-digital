import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/AccessDenied.css";

export default function AccessDenied() {
  return (
    <div>
      <Header />
      <div className="container-access-denied">
        <section className="section-access-denied">
          <h1 className="title-access-denied">⛔ Accès restreint !</h1>
          <p className="paragraph-access-denied">
            Il semble que vous essayez d’accéder à une page pour laquelle vous
            n’avez pas les autorisations nécessaires.{" "}
          </p>
          <Link className="button-access-denied" to="/home">
            Retour à l'accueil &#10132;
          </Link>
        </section>
      </div>
    </div>
  );
}
