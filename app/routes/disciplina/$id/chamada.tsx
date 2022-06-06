import _ from "lodash";
import { addDays } from "date-fns";
import { useLoaderData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";

import styles from "~/modules/chamada/chamada.styles.css";
import { Aluno } from "~/modules/aluno";
import {
  findAllAlunosByCodigo,
  Disciplina,
  findByCodigo as findDisciplinaByCodigo,
} from "~/modules/disciplina";
import {
  CreateFaltaDto,
  registrarChamada,
  datasDasAulas,
} from "~/modules/chamada";

export const links = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = { alunos: Aluno[]; disciplina: Disciplina };
export const loader: LoaderFunction = async ({ params }) => {
  const [alunos] = await findAllAlunosByCodigo(params.id ?? "");
  const [disciplina] = await findDisciplinaByCodigo(params?.id ?? "");

  if (!disciplina) {
    return redirect("/");
  }
  return json<LoaderData>({ alunos: alunos ?? [], disciplina });
};

const toInt = (entry: FormDataEntryValue) => parseInt(entry.toString());
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = formData.get("data")?.toString();
  const ras = formData.getAll("ra[]").map(toInt);
  const faltas = formData.getAll("faltas[]").map(toInt);
  const chamada: CreateFaltaDto[] = _.zip(ras, faltas).map(
    ([ra, numeroDeFaltas]) => ({
      ra: ra ?? 0,
      faltas: numeroDeFaltas ?? 0,
      codigoDisciplina: id ?? "",
      data: data ?? "",
    })
  );

  await registrarChamada(chamada);
  return null;
};

export default function ChamadaPage() {
  const { alunos, disciplina } = useLoaderData<LoaderData>();

  return (
    <>
      <form className="chamada" method="POST">
        <label className="choose-date" htmlFor="data_da_chamada">
          <span>Data da chamada</span>
          <select name="data" id="data_da_chamada">
            {datasDasAulas.map((data) => {
              const formatedDate = addDays(new Date(data), 1);
              return (
                <option key={data} value={data}>
                  {formatedDate.toLocaleDateString("pt-BR")}
                </option>
              );
            })}
          </select>
        </label>

        <div>
          <div style={{ marginBottom: "1em" }}>Quantidade de faltas</div>
          {alunos.map((aluno) => {
            const ra = aluno.ra.toString();
            return (
              <div key={ra} className="checkbox-field">
                <span>{aluno.nome}</span>
                <input type="hidden" name="ra[]" value={aluno.ra} />
                <label htmlFor={ra}>
                  <input
                    type="number"
                    defaultValue={0}
                    min={0}
                    max={disciplina.numAulas === 80 ? 4 : 2}
                    name="faltas[]"
                    id={ra}
                  />
                </label>
              </div>
            );
          })}
        </div>
        <button>Registrar chamada</button>
      </form>
    </>
  );
}
