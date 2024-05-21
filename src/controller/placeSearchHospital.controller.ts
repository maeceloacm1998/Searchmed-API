import { StatusCode } from "../model/types/StatusCode";
import { converterHospitaDtoToModel } from "../model/types/models/HospitalsModel";
import {
  filterHospitalPerDistance,
  getHospitals,
} from "../services/places.service";
import { Request, Response } from "express";

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
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const range = Number(req.query.range);

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (hospitalName === "" || hospitalName === "undefined") {
    res.status(parseInt(StatusCode.notFound)).send({
      status: StatusCode.notFound,
      message: "Hospital name must be valid.",
    });
    return;
  }

  if (!latitude || !longitude) {
    res.status(parseInt(StatusCode.notFound)).send({
      status: StatusCode.notFound,
      message: "Latitude and longitude must be valid.",
    });
    return;
  }

  const hospitalsList = await getHospitals();

  switch (hospitalsList.status) {
    case StatusCode.Success: {
      const matchHospitals = hospitalsList.result.filter((hospital) => {
        return hospital.name.toLowerCase().includes(hospitalName.toLowerCase());
      });

      const hospitalsListFilteredPerDistance = filterHospitalPerDistance(
        matchHospitals,
        {
          lat: latitude,
          lng: longitude,
        },
        getRange(range)
      );

      const paginateResults = hospitalsListFilteredPerDistance.slice(
        calculateStartIndex(page, limit),
        calculateEndIndex(page, limit)
      );

      res.status(parseInt(StatusCode.Success)).send({
        status: StatusCode.Success,
        result: paginateResults.map((hospital) => {
          return converterHospitaDtoToModel(hospital);
        }),
        nextpage: generateNextPageUrl(req, page, limit),
        prevPage: generatePreviousPageUrl(req, page, limit),
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
 *  Get the range to search for hospitals
 * @param range  The range to search for hospitals
 * @returns  The range to search for hospitals
 */
function getRange(range: number): number {
  return range || 10000;
}

/**
 * Generate the next page URL
 * @param req  The request object
 * @param page  The page number to generate the next page URL
 * @param limit  The limit of items per page to generate the next page URL
 * @returns The next page URL or null if there is no next page URL
 */
function generateNextPageUrl(
  req: Request,
  page: number,
  limit: number
): string | null {
  return page < limit
    ? `${req.protocol}://${req.headers.host}${req.baseUrl}?page=${
        page + 1
      }&limit=${limit}`
    : null;
}

/**
 * Generate the previous page URL
 * @param req  The request object
 * @param page  The page number to generate the previous page URL
 * @param limit  The limit of items per page to generate the previous page URL
 * @returns The previous page URL or null if there is no previous page URL
 */
function generatePreviousPageUrl(
  req: Request,
  page: number,
  limit: number
): string | null {
  return page > 1
    ? `${req.protocol}://${req.headers.host}${req.baseUrl}?page=${
        page - 1
      }&limit=${limit}`
    : null;
}

/**
 * Calculate the start index of the page to paginate
 * @param page  The page number
 * @param limit  The limit of items per page
 * @returns The start index
 */
function calculateStartIndex(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * Calculate the end index of the page to paginate
 * @param page  The page number
 * @param limit  The limit of items per page
 * @returns The end index
 */
function calculateEndIndex(page: number, limit: number): number {
  return page * limit;
}

export { placeSearchHospitalController };
