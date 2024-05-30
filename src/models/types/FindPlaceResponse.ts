import { PlaceData } from "@googlemaps/google-maps-services-js";

export interface FindPlaceResponse {
    nextPageToken: string | undefined,
    placeList: Partial<PlaceData>[]
}