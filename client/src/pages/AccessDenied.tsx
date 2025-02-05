import Header from "../components/Header";
import "../styles/AccessDenied.css";
export default function AccessDenied() {
  return (
    <div>
      <Header />
      <div className="container access denied">
        <section className="section access denied">
          <p>
            Il semblerait que tu essaies d'accéder à une page sans droit d'accès
            ! Pour retourner à la page d'accueil de Jestone clique sur{" "}
            <a href="http://localhost:3000/">Accueil Jestone</a>
          </p>
        </section>
      </div>
    </div>
  );
}
