import {
  Client,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResult,
} from "@googlemaps/google-maps-services-js";

import { HospitalDTOModel } from "@models/types/dto/HospitalDTOModel";
import { PlaceStatus } from "@models/types/PlaceStatus";
import { StatusCode } from "@models/types/status.code";
import hospitalSchema from "@models/schema/HospitalSchema";
import { env } from "@helpers/env";

async function placeAutoComplete(
  address: string
): Promise<PlaceStatus<PlaceAutocompleteResult[]>> {
  try {
    const client: Client = new Client();
    const request: PlaceAutocompleteRequest = {
      params: {
        input: address,
        language: "pt_BR",
        components: ["country:br"],
        key: env.PLACE_API_KEY as string,
      },
    };
    const result = await client.placeAutocomplete(request);

    return {
      status: StatusCode.Success,
      result: result.data.predictions,
    };
  } catch (e) {
    return {
      status: StatusCode.notFound,
      result: [],
    };
  }
}

/**
 * Retorna todos os hospitais públicos em Belo Horizonte.
 * @returns Array<HospitalDTOModel>
 * @throws NotFound
 */
async function getHospitals({
  limit,
  page,
  lat,
  lng,
  range,
}: {
  page: number;
  limit: number;
  lat: number;
  lng: number;
  range: number;
}): Promise<PlaceStatus<HospitalDTOModel[]>> {
  try {
    const hospitalList = await hospitalSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          maxDistance: range,
          spherical: true,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    return {
      status: StatusCode.Success,
      result: hospitalList,
    };
  } catch (e) {
    return {
      status: StatusCode.notFound,
      result: [] as HospitalDTOModel[],
    };
  }
}

/**
 *  Retorna os hospitais filtrados por nome e localização.
 * @param param0  name: string; page: number; limit: number; lat: number; lng: number; range: number;
 * @returns Array<HospitalDTOModel> lista de hospitais filtrados por distância
 * @throws NotFound caso não encontre hospitais
 */
async function getFilteredHospitals({
  name,
  limit,
  page,
  lat,
  lng,
  range,
}: {
  name: string;
  page: number;
  limit: number;
  lat: number;
  lng: number;
  range: number;
}): Promise<PlaceStatus<HospitalDTOModel[]>> {
  try {
    const hospitalList = await hospitalSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          maxDistance: range,
          spherical: true,
        },
      },
      {
        $match: {
          name: {
            $regex: new RegExp(name, "i"),
          },
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    return {
      status: StatusCode.Success,
      result: hospitalList,
    };
  } catch (e) {
    return {
      status: StatusCode.notFound,
      result: [] as HospitalDTOModel[],
    };
  }
}

// Funcao para buscar hospitais publicos em Belo Horizonte na api do google
// async function findPlace(
//   address: string,
//   type?: PlaceType1 | undefined
// ): Promise<PlaceStatus<FindPlaceResponse>> {
//   try {
//     const client: Client = new Client();
//     let request: TextSearchRequest = {
//       params: {
//         query: address,
//         language: Language.pt_BR,
//         type: type,
//         key: env.PLACE_API_KEY as string,
//       },
//     };

//     const { data } = await client.textSearch(request);

//     return {
//       status: StatusCode.Success,
//       result: {
//         nextPageToken: data.next_page_token,
//         placeList: data.results,
//       },
//     };
//   } catch (error) {
//     if (error instanceof Error) throw new Error(error.message);
//     return {
//       status: StatusCode.notFound,
//       result: {} as FindPlaceResponse,
//     };
//   }
// }

// Buscar hospital específico pelo place_id na api do google
// async function placeHospitalDetails(
//   placeId: string
// ): Promise<PlaceStatus<HospitalDestailsResponse>> {
//   try {
//     const client: Client = new Client();
//     const request: PlaceDetailsRequest = {
//       params: {
//         place_id: placeId,
//         language: Language.pt_BR,
//         key: env.PLACE_API_KEY as string,
//       },
//     };
//     const { data } = await client.placeDetails(request);

//     return {
//       status: StatusCode.Success,
//       result: converterToHospitaDetailsResponse(data.result),
//     };
//   } catch (error) {
//     if (error instanceof Error) throw new Error(error.message);
//     return {
//       status: StatusCode.notFound,
//       result: {} as HospitalDestailsResponse,
//     };
//   }
// }

export { placeAutoComplete, getHospitals, getFilteredHospitals };
