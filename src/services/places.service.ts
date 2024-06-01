import {
  Client,
  Language,
  LatLngLiteral,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResult,
  PlaceDetailsRequest,
  PlaceType1,
  TextSearchRequest,
} from '@googlemaps/google-maps-services-js';
import { getPreciseDistance } from 'geolib';

import {
  HospitalDestailsResponse,
  converterToHospitaDetailsResponse,
} from '@models/types/HospitalDetailsResponse';
import { FindPlaceResponse } from '@models/types/FindPlaceResponse';
import { HospitalDTOModel } from '@models/types/dto/HospitalDTOModel';
import { PlaceStatus } from '@models/types/PlaceStatus';
import { StatusCode } from '@models/types/status.code';
import hospitalSchema from '@models/schema/HospitalSchema';
import { env } from '@helpers/env';

async function placeAutoComplete(
  address: string
): Promise<PlaceStatus<PlaceAutocompleteResult[]>> {
  try {
    const client: Client = new Client();
    const request: PlaceAutocompleteRequest = {
      params: {
        input: address,
        language: 'pt_BR',
        components: ['country:br'],
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
async function getHospitals(): Promise<PlaceStatus<HospitalDTOModel[]>> {
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
            type: 'Point',
            coordinates: [lng, lat],
          },
          distanceField: 'distance',
          maxDistance: range,
          spherical: true,
        },
      },
      {
        $match: {
          name: {
            $regex: new RegExp(name, 'i'),
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

async function placeSearchHospital(
  address: string
): Promise<PlaceStatus<HospitalDTOModel[]>> {
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
): Promise<PlaceStatus<FindPlaceResponse>> {
  try {
    const client: Client = new Client();
    let request: TextSearchRequest = {
      params: {
        query: address,
        language: Language.pt_BR,
        type: type,
        key: env.PLACE_API_KEY as string,
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
): Promise<PlaceStatus<HospitalDestailsResponse>> {
  try {
    const client: Client = new Client();
    const request: PlaceDetailsRequest = {
      params: {
        place_id: placeId,
        language: Language.pt_BR,
        key: env.PLACE_API_KEY as string,
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
  getFilteredHospitals,
  filterHospitalPerDistance,
};
