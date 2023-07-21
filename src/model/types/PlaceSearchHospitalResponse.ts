import { AddressGeometry, AddressType, OpeningHours } from "@googlemaps/google-maps-services-js";

export interface SearchHospitalModel {
    address: string | undefined,
    geometry: AddressGeometry | undefined,
    name: string | undefined,
    opening_hours: OpeningHours | undefined,
    place_id: string | undefined,
    rating: number | undefined,
    distance: number | undefined,
    types: AddressType[] | undefined
    isEmergencyHospital: boolean | undefined
}