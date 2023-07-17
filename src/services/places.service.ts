import { Client, Language, LatLngLiteral, PlaceAutocompleteRequest, PlaceAutocompleteResult, PlaceType1, PlacesNearbyRequest, TextSearchRequest } from "@googlemaps/google-maps-services-js";
import { FindPlaceResponse } from "../model/types/FindPlaceResponse";
import { getPreciseDistance } from 'geolib';
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

async function placeSearchHospital(address: string) {

    try {
        const client: Client = new Client()
        const place = await findPlace(address)
        const locationAddress = place.result.geometry?.location as LatLngLiteral

        const request: PlacesNearbyRequest = {
            params: {
                location: locationAddress,
                keyword: "(emergency) AND ((medical centre) OR hospital) AND (24 hours)",
                type: "hospital",
                radius: 15000,
                key: enviroments.PLACE_API_KEY
            }
        }
        const result = await client.placesNearby(request)

        // TODO Retorno de cornada, mas ainda nao sei se é metros ou kilometros
        const dale = result.data.results.map((item) => {
            const codenate = getPreciseDistance(locationAddress, item.geometry?.location as LatLngLiteral, 1)
            console.log(codenate)
        })

        // return {
        //     status: StatusCode.Success,
        //     result: result.data.predictions
        // }
    } catch (e) {
        return {
            status: StatusCode.notFound,
            result: []
        }
    }
}

async function findPlace(address: string, type?: PlaceType1 | undefined): Promise<PlaceState<FindPlaceResponse>> {
    try {
        const client: Client = new Client()
        const request: TextSearchRequest = {
            params: {
                query: address,
                language: Language.pt_BR,
                type: type,
                key: enviroments.PLACE_API_KEY
            }
        }
        const { data } = await client.textSearch(request)
        const response: FindPlaceResponse = {
            address: address,
            geometry: data.results[0].geometry,
            placeId: data.results[0].place_id
        }

        return {
            status: StatusCode.Success,
            result: response
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