import { Client, Language, LatLngLiteral, PlaceAutocompleteRequest, PlaceAutocompleteResult, PlaceData, PlaceDetailsRequest, PlaceType1, TextSearchRequest } from "@googlemaps/google-maps-services-js";
import { getPreciseDistance } from 'geolib';

import { HospitalDestailsResponse, converterToHospitaDetailsResponse } from "../model/types/HospitalDetailsResponse";
import { FindPlaceResponse } from "../model/types/FindPlaceResponse";
import { SearchHospitalModel } from "../model/types/PlaceSearchHospitalResponse";
import { PlaceState } from "../model/types/PlaceState";
import { StatusCode } from "../model/types/StatusCode";
import hospitalSchema from "../model/schema/HospitalSchema";

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

async function placeSearchHospital(address: string): Promise<PlaceState<SearchHospitalModel[]>> {
    try {
        const { result } = await findPlace(address)
        const hospitalList = await hospitalSchema.find().exec()
        const addressUser = result.placeList[0].geometry?.location as LatLngLiteral

        const hospitalFilterPerDistance: SearchHospitalModel[] = filterHospitalPerDistance(hospitalList, addressUser)
        return {
            status: StatusCode.Success,
            result: hospitalFilterPerDistance
        }
    } catch (e) {
        return {
            status: StatusCode.notFound,
            result: [] as SearchHospitalModel[]
        }
    }
}

function filterHospitalPerDistance(hospitalList: SearchHospitalModel[], addressUser: LatLngLiteral): SearchHospitalModel[] {
    return hospitalList.map((item) => {
        let hospital = item
        item.distance = Math.round(getPreciseDistance(addressUser, item.geometry?.location as LatLngLiteral, 1))
        return hospital
    }).sort(function compare(a, b) {
        if (a.distance!! < b.distance!!) return -1;
        if (a.distance!! > b.distance!!) return 1;
        return 0;
    })
}

async function findPlace(address: string, type?: PlaceType1 | undefined, pagetoken?: string): Promise<PlaceState<FindPlaceResponse>> {
    try {
        const client: Client = new Client()
        let request = {}

        if (pagetoken) {
            request = {
                params: {
                    key: enviroments.PLACE_API_KEY,
                    pagetoken: pagetoken
                }
            }
        } else {
            request = {
                params: {
                    query: address,
                    language: Language.pt_BR,
                    type: type,
                    key: enviroments.PLACE_API_KEY,
                    pagetoken: pagetoken
                }
            }
        }
        const { data } = await client.textSearch(request as TextSearchRequest)

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

export {
    placeAutoComplete,
    placeSearchHospital,
    placeHospitalDetails
}