import { StatusCode } from "@models/types/StatusCode";
import { converterHospitaDtoToModel } from "@models/types/HospitalsModel";
import { getFilteredHospitals } from "@services/places.service";
import { Request, Response } from "express";

/**
 *  Get the range to search for hospitals
 * @param range  The range to search for hospitals
 * @returns  The range to search for hospitals
 */
function getRange(range: number): number {
  return range || 10000;
}

/**
 * Controlador para a rota /place/hospital/search. Espera os seguintes parâmetros de consulta:
 * @param hospitalName: o nome do hospital
 * @param latitude: a latitude do usuário
 * @param longitude: a longitude do usuário
 * @param range: o alcance para buscar hospitais
 * @param page: o número da página
 * @param limit: o limite de itens por página
 *
 * @returns Array<HospitalsModel>
 * @throws NotFound
 */
async function placeSearchHospitalController(req: Request, res: Response) {
  const hospitalName = String(req.query.hospitalName);
  const lat = Number(req.query.latitude);
  const lng = Number(req.query.longitude);
  const range = Number(req.query.range);

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const hospitalsList = await getFilteredHospitals({
    name: hospitalName,
    page,
    limit,
    lat,
    lng,
    range: getRange(range),
  });

  switch (hospitalsList.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send({
        status: StatusCode.Success,
        result: hospitalsList.result.map(converterHospitaDtoToModel),
      });
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send();
      break;
    }
  }
}

export { placeSearchHospitalController };
