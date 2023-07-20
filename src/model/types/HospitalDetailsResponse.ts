import { AddressGeometry, AddressType, OpeningHours, PlaceReview } from "@googlemaps/google-maps-services-js"

export interface HospitalDestailsResponse {
      adrAddress: string | undefined,
      currentOpeningHours: OpeningHours | undefined,
      formatted_address: string | undefined,
      formatted_phone_number: string | undefined,
      geometry: AddressGeometry | undefined,
      international_phone_number: string | undefined,
      name: string | undefined,
      place_id: string | undefined,
      rating: number | undefined,
      reviews: PlaceReview[] | undefined,
      types: AddressType[] | undefined,
      url: string | undefined,
      vicinity: string | undefined,
}
