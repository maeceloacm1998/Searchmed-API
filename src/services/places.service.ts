import { Client, Language, LatLngLiteral, PlaceAutocompleteRequest, PlaceAutocompleteResult, PlaceData, PlaceDetailsRequest, PlaceType1, TextSearchRequest } from "@googlemaps/google-maps-services-js";
import { getPreciseDistance } from 'geolib';

import { FindPlaceResponse } from "../model/types/FindPlaceResponse";
import { PlaceSearchHospitalResponse, SearchHospitalModel } from "../model/types/PlaceSearchHospitalResponse";
import { HospitalDestailsResponse } from "../model/types/HospitalDetailsResponse";
import { PlaceState } from "../model/types/PlaceState";
import { StatusCode } from "../model/types/StatusCode";

import enviroments from "../enviroments";


async function placeAutoComplete(address: string): Promise<PlaceState<PlaceAutocompleteResult[]>> {
    try {
        const client: Client = new Client()
        const request: PlaceAutocompleteRequest = {
            params: {
                input: address,
                language: "pt_BR",
                components: ["country:br"],
                key: enviroments.PLACE_API_KEY
            }
        }
        const result = await client.placeAutocomplete(request)

        return {
            status: StatusCode.Success,
            result: result.data.predictions
        }
    } catch (e) {
        return {
            status: StatusCode.notFound,
            result: []
        }
    }
}

async function placeSearchHospital(address: string, pageToken: string): Promise<PlaceState<PlaceSearchHospitalResponse>> {
    const searchName = "hopistal publico em belo horizonte"
    try {
        const { result } = await findPlace(address)
        const hospitalList = await findPlace(searchName, undefined, pageToken)
        const addressUser = result.placeList[0].geometry?.location as LatLngLiteral
        const newPlaceResult: SearchHospitalModel[] = hospitalList.result.placeList.map((item, index) => {
            return {
                id: index.toString(),
                address: item.formatted_address,
                geometry: item.geometry,
                name: item.name,
                opening_hours: item.opening_hours,
                place_id: item.place_id,
                rating: item.rating,
                types: item.types,
                distance: Math.round(getPreciseDistance(addressUser, item.geometry?.location as LatLngLiteral, 1))
            }
        })

        return {
            status: StatusCode.Success,
            result: {
                nextPageToken: hospitalList.result.nextPageToken,
                hospitalList: newPlaceResult
            }
        }
    } catch (e) {
        return {
            status: StatusCode.notFound,
            result: {} as PlaceSearchHospitalResponse
        }
    }
}

async function findPlace(address: string, type?: PlaceType1 | undefined, pagetoken?: string): Promise<PlaceState<FindPlaceResponse>> {
    try {
        const client: Client = new Client()
        const request: TextSearchRequest = {
            params: {
                query: address,
                language: Language.pt_BR,
                type: type,
                key: enviroments.PLACE_API_KEY,
                pagetoken: pagetoken
            }
        }
        const { data } = await client.textSearch(request)

        return {
            status: StatusCode.Success,
            result: {
                nextPageToken: data.next_page_token,
                placeList: data.results
            }
        }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
        return {
            status: StatusCode.notFound,
            result: {} as FindPlaceResponse
        }
    }
}

async function placeHospitalDetails(placeId: string): Promise<PlaceState<HospitalDestailsResponse>> {
    try {
        const client: Client = new Client()
        const request: PlaceDetailsRequest = {
            params: {
                place_id: placeId,
                language: Language.pt_BR,
                key: enviroments.PLACE_API_KEY
            }
        }
        const { data } = await client.placeDetails(request)

        return {
            status: StatusCode.Success,
            result: converterToHospitaDetailsResponse(data.result)
        }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
        return {
            status: StatusCode.notFound,
            result: {} as HospitalDestailsResponse
        }
    }
}

function converterToHospitaDetailsResponse(hospitalDetail: Partial<PlaceData>): HospitalDestailsResponse {
    return {
        adrAddress: hospitalDetail.adr_address,
        currentOpeningHours: hospitalDetail.opening_hours,
        formatted_address: hospitalDetail.formatted_address,
        formatted_phone_number: hospitalDetail.formatted_phone_number,
        geometry: hospitalDetail.geometry,
        international_phone_number: hospitalDetail.international_phone_number,
        name: hospitalDetail.name,
        place_id: hospitalDetail.place_id,
        rating: hospitalDetail.rating,
        reviews: hospitalDetail.reviews,
        types: hospitalDetail.types,
        url: hospitalDetail.url,
        vicinity: hospitalDetail.vicinity
    }
}

export {
    placeAutoComplete,
    placeSearchHospital,
    placeHospitalDetails
}