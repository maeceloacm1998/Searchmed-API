import { AddressType } from "@googlemaps/google-maps-services-js";

export interface HospitalDTO {
  place_id: string;
  address: string;
  name: string;
  rating: number;
  distance: number;
  types: AddressType[];
  isEmergencyHospital: boolean;
  phoneNumber: string;
  reviews: Array<HospitalReviewDTO>;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

export interface HospitalReviewDTO {
  author: string;
  authorUrl: string;
  photo: string;
  rating: number;
  comment: string;
  date: Date;
}
