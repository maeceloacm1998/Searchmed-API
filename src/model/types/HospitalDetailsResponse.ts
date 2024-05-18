import {
  AddressGeometry,
  AddressType,
  OpeningHours,
  PlaceData,
  PlaceReview,
} from "@googlemaps/google-maps-services-js";

export interface HospitalDestailsResponse {
  adrAddress: string | undefined;
  currentOpeningHours: OpeningHours | undefined;
  formatted_address: string | undefined;
  formatted_phone_number: string | undefined;
  geometry: AddressGeometry | undefined;
  international_phone_number: string | undefined;
  name: string | undefined;
  place_id: string | undefined;
  rating: number | undefined;
  reviews: PlaceReview[] | undefined;
  types: AddressType[] | undefined;
  url: string | undefined;
  vicinity: string | undefined;
}

export function converterToHospitaDetailsResponse(
  hospitalDetail: Partial<PlaceData>
): HospitalDestailsResponse {
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
    vicinity: hospitalDetail.vicinity,
  };
}
