import { AddressType } from "@googlemaps/google-maps-services-js";

export interface HospitalDTOModel {
  place_id: string;
  address: string;
  name: string;
  rating: number;
  distance: number;
  types: AddressType[];
  isEmergencyHospital: boolean;
  phoneNumber: string;
  reviews: Array<HospitalReviewDTO>;
}

export interface HospitalReviewDTO {
  author: string;
  authorUrl: string;
  photo: string;
  rating: number;
  comment: string;
  date: Date;
}
