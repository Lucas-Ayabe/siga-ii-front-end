import { Aluno } from "../aluno";
import { apiClientService } from "../http/api-client.service";
import { Disciplina } from "./model";

export const findAll = () => {
  return apiClientService.get<Disciplina[], any>("/disciplinas");
};

export const findByCodigo = (codigo: string) => {
  return apiClientService.get<Disciplina, any>(`/disciplinas/${codigo}`);
};

export const findAllAlunosByCodigo = (codigo: string) => {
  const endpoint = `/disciplinas/${codigo}/alunos`;
  return apiClientService.get<Aluno[], any>(endpoint);
};
