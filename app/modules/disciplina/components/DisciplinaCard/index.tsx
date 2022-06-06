import { Link } from "@remix-run/react";
import { Disciplina } from "../../model";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const DisciplinaCard = ({
  codigo,
  nome,
  numAulas,
  sigla,
  turno,
}: Disciplina) => {
  return (
    <article className="disciplina-card">
      <h2>
        {nome} ({sigla})
      </h2>
      <em>turno: {turno}</em>
      <p>N° de aulas: {numAulas}</p>
      <Link role="button" to={`/disciplina/${codigo}`}>
        Ir para disciplina
      </Link>
    </article>
  );
};
