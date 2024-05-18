import {
  Client,
  Language,
  LatLngLiteral,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResult,
  PlaceDetailsRequest,
  PlaceType1,
  TextSearchRequest,
} from "@googlemaps/google-maps-services-js";
import { getPreciseDistance } from "geolib";

import {
  HospitalDestailsResponse,
  converterToHospitaDetailsResponse,
} from "../model/types/HospitalDetailsResponse";
import { FindPlaceResponse } from "../model/types/FindPlaceResponse";
import { HospitalDTOModel } from "../model/types/models/dto/HospitalDTOModel";
import { PlaceState } from "../model/types/PlaceState";
import { StatusCode } from "../model/types/StatusCode";
import hospitalSchema from "../model/schema/HospitalSchema";

async function placeAutoComplete(
  address: string
): Promise<PlaceState<PlaceAutocompleteResult[]>> {
  try {
    const client: Client = new Client();
    const request: PlaceAutocompleteRequest = {
      params: {
        input: address,
        language: "pt_BR",
        components: ["country:br"],
        key: process.env.PLACE_API_KEY as string,
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
async function getHospitals(): Promise<PlaceState<HospitalDTOModel[]>> {
  try {
    const hospitalList: Array<HospitalDTOModel> = await hospitalSchema
      .find()
      .exec();

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

async function placeSearchHospital(
  address: string
): Promise<PlaceState<HospitalDTOModel[]>> {
  try {
    const { result } = await findPlace(address);
    const hospitalList = await hospitalSchema.find().exec();
    const addressUser = result.placeList[0].geometry?.location as LatLngLiteral;

    const hospitalFilterPerDistance: HospitalDTOModel[] =
      filterHospitalPerDistance(hospitalList, addressUser);
    return {
      status: StatusCode.Success,
      result: hospitalFilterPerDistance,
    };
  } catch (e) {
    return {
      status: StatusCode.notFound,
      result: [] as HospitalDTOModel[],
    };
  }
}

/**
 * Filtra os hospitais por distância.
 * @param hospitalList lista de hospitais
 * @param addressUser endereço do usuário
 * @param range alcance para buscar hospitais
 * @returns Array<HospitalDTOModel> lista de hospitais filtrados por distância
 * @default 10000
 */
function filterHospitalPerDistance(
  hospitalList: HospitalDTOModel[],
  addressUser: LatLngLiteral,
  range: number = 10000
): HospitalDTOModel[] {
  return hospitalList
    .map((item) => {
      let hospital = item;
      hospital.distance = Math.round(
        getPreciseDistance(
          addressUser,
          item.geometry?.location as LatLngLiteral,
          1
        )
      );
      return hospital;
    })
    .filter((item) => item.distance <= range)
    .sort(function compare(a, b) {
      if (a.distance!! < b.distance!!) return -1;
      if (a.distance!! > b.distance!!) return 1;
      return 0;
    });
}

async function findPlace(
  address: string,
  type?: PlaceType1 | undefined
): Promise<PlaceState<FindPlaceResponse>> {
  try {
    const client: Client = new Client();
    let request: TextSearchRequest = {
      params: {
        query: address,
        language: Language.pt_BR,
        type: type,
        key: process.env.PLACE_API_KEY as string,
      },
    };

    const { data } = await client.textSearch(request);

    return {
      status: StatusCode.Success,
      result: {
        nextPageToken: data.next_page_token,
        placeList: data.results,
      },
    };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return {
      status: StatusCode.notFound,
      result: {} as FindPlaceResponse,
    };
  }
}

async function placeHospitalDetails(
  placeId: string
): Promise<PlaceState<HospitalDestailsResponse>> {
  try {
    const client: Client = new Client();
    const request: PlaceDetailsRequest = {
      params: {
        place_id: placeId,
        language: Language.pt_BR,
        key: process.env.PLACE_API_KEY as string,
      },
    };
    const { data } = await client.placeDetails(request);

    return {
      status: StatusCode.Success,
      result: converterToHospitaDetailsResponse(data.result),
    };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return {
      status: StatusCode.notFound,
      result: {} as HospitalDestailsResponse,
    };
  }
}

export {
  placeAutoComplete,
  placeSearchHospital,
  placeHospitalDetails,
  getHospitals,
  filterHospitalPerDistance,
};
