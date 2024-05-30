import { Request, Response } from "express";
import {
  filterHospitalPerDistance,
  getHospitals,
} from "@services/places.service";
import { StatusCode } from "@models/types/status.code";
import { HospitalDTOModel } from "@models/types/dto/HospitalDTOModel";
import { converterHospitaDtoToModel } from "@models/types/HospitalsModel";

/**
 * Busca o hospital mais próximo de acordo com a latitude e longitude informada.
 * @param req
 * @param res
 *
 * @param latitude: a latitude do usuário
 * @param longitude: a longitude do usuário
 * @param range: o alcance para buscar hospitais
 *
 * @returns HospitalModel
 * @throws NotFound
 */
async function placeSearchHospitalToEmergencyController(
  req: Request,
  res: Response
) {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const range = Number(req.query.range);

  const hospitalsList = await getHospitals();

  switch (hospitalsList.status) {
    case StatusCode.Success: {
      const hospitalsListFilteredPerDistance = filterHospitalPerDistance(
        hospitalsList.result,
        {
          lat: latitude,
          lng: longitude,
        },
        getRange(range)
      );

      if (notExistHospitalInRange(hospitalsListFilteredPerDistance)) {
        res.status(parseInt(StatusCode.NotRange)).send({
          status: StatusCode.NotRange,
          result: "Hospital not found. Try to increase the range.",
        });
        return;
      }

      res.status(parseInt(StatusCode.Success)).send({
        status: StatusCode.Success,
        result: converterHospitaDtoToModel(hospitalsListFilteredPerDistance[0]),
      });
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send({
        status: StatusCode.notFound,
        result: "Hospital not found.",
      });
      break;
    }
  }
}

/**
 * Função para pegar o alcance de busca de hospitais.
 * @param range range para buscar hospitais
 * @returns number range
 */
function getRange(range: number): number {
  return range || 10000;
}

/**
 * Verifica se não existe hospital no range.
 * @param hospitalsListFilteredPerDistance  lista de hospitais filtrados por distância
 * @returns boolean true se não existir hospital no range
 */
function notExistHospitalInRange(
  hospitalsListFilteredPerDistance: Array<HospitalDTOModel>
): boolean {
  return hospitalsListFilteredPerDistance.length === 0;
}

export { placeSearchHospitalToEmergencyController };
