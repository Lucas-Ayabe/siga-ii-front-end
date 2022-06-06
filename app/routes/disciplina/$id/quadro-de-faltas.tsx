import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  datasDasAulasFormatadas,
  findQuadroDeFaltasPorDisciplina,
  HistoricoDeFaltas,
} from "~/modules/chamada";

export const loader: LoaderFunction = async ({ params }) => {
  const [quadroDeFaltas] = await findQuadroDeFaltasPorDisciplina(
    params.id ?? ""
  );

  return json(quadroDeFaltas ?? []);
};

export default function QuadroDeFaltasPage() {
  const quadroDeFaltas = useLoaderData<HistoricoDeFaltas[]>();

  return (
    <section className="card">
      <h2>Quadro de faltas</h2>

      <figure>
        <table>
          <caption style={{ visibility: "hidden" }}>Faltas</caption>
          <thead>
            <tr>
              <th scope="col">RA</th>
              <th scope="col">Nome</th>
              {datasDasAulasFormatadas.map((col) => (
                <th scope="col" key={col}>
                  {col}
                </th>
              ))}
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {quadroDeFaltas.map((historico) => {
              const colunasDataN = Object.entries(historico)
                .filter(([key]) => key.startsWith("data"))
                .map(([key, value]) => ({ key, value }));

              return (
                <tr key={historico.ra}>
                  <td>{historico.ra}</td>
                  <td
                    style={{
                      background: "var(--background-color)",
                      position: "sticky",
                      left: "0",
                    }}
                  >
                    {historico.nome}
                  </td>
                  {colunasDataN.map(({ key, value }) => {
                    return <td key={historico.ra + key}>{value}</td>;
                  })}
                  <td>{historico.totalFaltas}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </figure>
    </section>
  );
}
