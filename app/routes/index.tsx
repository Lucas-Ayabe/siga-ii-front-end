import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  Disciplina,
  DisciplinaCard,
  findAll as findAllDisciplinas,
  links as disciplinaCardLinks,
} from "~/modules/disciplina";

export const links = () => [...disciplinaCardLinks()];

export const loader: LoaderFunction = async () => {
  const [disciplinas] = await findAllDisciplinas();
  return json<Disciplina[]>(disciplinas ? disciplinas : []);
};

export default function IndexPage() {
  const disciplinas = useLoaderData<Disciplina[]>();
  return (
    <main className="container">
      <h1>SIGA II - Disciplinas</h1>
      <section className="auto-grid">
        {disciplinas.map((disciplina) => (
          <DisciplinaCard key={disciplina.codigo} {...disciplina} />
        ))}
      </section>
    </main>
  );
}
