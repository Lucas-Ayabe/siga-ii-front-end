import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  Disciplina,
  findByCodigo as findDisciplinaByCodigo,
} from "~/modules/disciplina";

export const loader: LoaderFunction = async ({ params }) => {
  const [disciplina] = await findDisciplinaByCodigo(params?.id ?? "");

  if (!disciplina) {
    return redirect("/");
  }

  return json<Disciplina>(disciplina);
};

export default function DisciplinaPageLayout() {
  const disciplina = useLoaderData<Disciplina>();
  return (
    <main className="container">
      <h1>
        <Link to="/">SIGA II - </Link>
        <Link to={`/disciplina/${disciplina.codigo}`}>
          {disciplina.nome} ({disciplina.turno})
        </Link>
      </h1>

      <Outlet />
    </main>
  );
}
