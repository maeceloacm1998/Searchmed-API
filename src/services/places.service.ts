import { Client, Language, LatLngLiteral, PlaceAutocompleteRequest, PlaceAutocompleteResult, PlaceType1, TextSearchRequest } from "@googlemaps/google-maps-services-js";
import { getPreciseDistance } from 'geolib';

import { FindPlaceResponse } from "../model/types/FindPlaceResponse";
import { PlaceSearchHospitalResponse, SearchHospitalModel } from "../model/types/PlaceSearchHospitalResponse";
import enviroments from "../enviroments";

export interface PlaceState<T> {
    status: string,
    result: T
}

export enum StatusCode {
    Success = "200",
    notFound = "404"
}


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
        console.log(pagetoken)
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

export {
    placeAutoComplete,
    placeSearchHospital
}