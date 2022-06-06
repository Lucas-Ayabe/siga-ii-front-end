import { Link, useParams } from "@remix-run/react";

export default function DisciplinaPage() {
  const { id } = useParams();
  return (
    <div className="auto-grid">
      <section className="card">
        <h2>Chamada</h2>

        <div className="line">
          <Link role="button" to={`/disciplina/${id}/quadro-de-faltas`}>
            Ver quadro de faltas
          </Link>

          <Link role="button" to={`/disciplina/${id}/chamada`}>
            Registrar chamada
          </Link>
        </div>
      </section>
      <div></div>
    </div>
  );
}
