import { Request, Response } from "express";
import { StatusCode } from "../model/types/StatusCode";
import {
  filterHospitalPerDistance,
  getHospitals,
} from "../services/places.service";
import { PlaceStatus } from "../model/types/PlaceStatus";
import { HospitalDTOModel } from "../model/types/models/dto/HospitalDTOModel";

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

  if (isNaN(latitude) || isNaN(longitude)) {
    res
      .status(parseInt(StatusCode.notFound))
      .send("Latitude and Longitude must be valid numbers.");
    return;
  }

  const hospitalsList: PlaceStatus<Array<HospitalDTOModel>> =
    await getHospitals();

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

      res.status(parseInt(StatusCode.Success)).send({
        status: StatusCode.Success,
        result: hospitalsListFilteredPerDistance.map(
          (hospital) => hospital.geometry.location
        ),
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
