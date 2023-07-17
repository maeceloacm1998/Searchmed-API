import { AddressGeometry } from "@googlemaps/google-maps-services-js";

export interface FindPlaceResponse {
    placeId: string | undefined,
    geometry: AddressGeometry | undefined,
    address: string
}