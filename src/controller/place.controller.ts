import { Request, Response } from "express";
import { StatusCode } from "../model/types/StatusCode";
import {
  filterHospitalPerDistance,
  getHospitals,
  placeAutoComplete,
  placeHospitalDetails,
  placeSearchHospital,
} from "../services/places.service";
import { PlaceState } from "../model/types/PlaceState";
import { SearchHospitalModel } from "../model/types/response/PlaceSearchHospitalResponse";

async function placeAutoCompleteController(req: Request, res: Response) {
  const address: string = req.body.address;

  const autocompleteRequest = await placeAutoComplete(address);

  switch (autocompleteRequest.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send(
        autocompleteRequest.result.map((item, index) => {
          return {
            id: index.toString(),
            address: item.description,
          };
        })
      );
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send([]);
      break;
    }
  }
}

/**
 * Controlador para a rota /place/hospitals/maps.
 * Espera os seguintes parâmetros de consulta:
 * - latitude: a latitude do usuário
 * - longitude: a longitude do usuário
 * - range: o alcance para buscar hospitais
 * @returns PlaceState<Array<PlaceSearchHospitalsMap>>
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

  const hospitalsList: PlaceState<Array<SearchHospitalModel>> =
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
        state: StatusCode.Success,
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

async function placeSearchHospitalController(req: Request, res: Response) {
  const address: string = req.body.address;

  const searchHospital = await placeSearchHospital(address);

  switch (searchHospital.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send(searchHospital);
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send([]);
      break;
    }
  }
}

async function placeSearchHospitalDetailsController(
  req: Request,
  res: Response
) {
  const placeId = req.query.placeid as string;

  const hospitalDestails = await placeHospitalDetails(placeId);

  switch (hospitalDestails.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send(hospitalDestails);
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send([]);
      break;
    }
  }
}

export {
  placeAutoCompleteController,
  placeSearchHospitalController,
  placeSearchHospitalDetailsController,
  placeSearchHospitalsMapsController,
};
