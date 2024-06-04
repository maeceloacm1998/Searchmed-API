import { Request, Response } from "express";
import { StatusCode } from "@models/types/StatusCode";
import { getHospitals } from "@services/places.service";
import { PlaceStatus } from "@models/types/PlaceStatus";
import { HospitalDTO } from "@models/types/dto/HospitalDTO";
import { converterHospitaDtoToModel } from "../models/types/HospitalsModel";

/**
 * Controlador para a rota /place/hospitals/maps.
 * Espera os seguintes parâmetros de consulta:
 * @param latitude: a latitude do usuário
 * @param longitude: a longitude do usuário
 * @param range: o alcance para buscar hospitais
 * @returns PlaceStatus <Array<PlaceSearchHospitalsMap>>
 * @throws NotFound
 */
async function placeSearchHospitalsMapsController(req: Request, res: Response) {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const range = Number(req.query.range);

  const hospitalsList: PlaceStatus<Array<HospitalDTO>> = await getHospitals({
    page: 1,
    limit: 10000,
    lat: latitude,
    lng: longitude,
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

/**
 * Função para pegar o alcance de busca de hospitais.
 * @param range
 * @returns number
 * @default 10000
 */
function getRange(range: number) {
  if (isNaN(range)) {
    return 10000;
  }

  return range;
}

export { placeSearchHospitalsMapsController };
