import {
  AddressGeometry,
  AddressType,
  OpeningHours,
} from "@googlemaps/google-maps-services-js";

export interface SearchHospitalModel {
  address: string;
  geometry: AddressGeometry;
  name: string;
  opening_hours: OpeningHours;
  place_id: string;
  rating: number;
  distance: number;
  types: AddressType[];
  isEmergencyHospital: boolean | undefined;
}
