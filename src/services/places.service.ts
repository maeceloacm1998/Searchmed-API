import { Client, PlaceAutocompleteRequest, PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
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

export {
    placeAutoComplete
}