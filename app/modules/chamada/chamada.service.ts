import { apiClientService } from "../http/api-client.service";
import { CreateFaltaDto, HistoricoDeFaltas } from "./models";

export const registrarChamada = async (chamada: CreateFaltaDto[]) => {
  return apiClientService.post<any, CreateFaltaDto[]>("/faltas", chamada);
};

export const findQuadroDeFaltasPorDisciplina = async (
  codigoDisciplina: string
) => {
  return apiClientService.get<HistoricoDeFaltas[], any>(
    `/disciplinas/${codigoDisciplina}/faltas`
  );
};
