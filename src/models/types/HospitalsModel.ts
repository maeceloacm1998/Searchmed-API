import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { HospitalDTOModel } from './dto/HospitalDTOModel';

export interface HospitalModel {
  place_id: string;
  address: string;
  geometry: HospitalLatLng;
  name: string;
  rating: number;
  distance: number;
  isEmergencyHospital: boolean;
  phoneNumber: string;
  reviews: Array<HospitalReview>;
  location: HospitalLatLng;
}

export interface HospitalLatLng {
  latitude: number;
  longitude: number;
}

export interface HospitalReview {
  author: string;
  authorUrl: string;
  photo: string;
  rating: number;
  comment: string;
  date: Date;
}

/**
 * Converter HospitalDTOModel para HospitalModel
 * @param hospitalDto  HospitalDTOModel
 * @returns HospitalModel
 */
export function converterHospitaDtoToModel(
  hospitalDto: HospitalDTOModel
): HospitalModel {
  return {
    place_id: hospitalDto.place_id,
    address: hospitalDto.address,
    geometry: converterLatLngToHospitalLatLng(hospitalDto.geometry.location),
    name: hospitalDto.name,
    rating: hospitalDto.rating,
    distance: hospitalDto.distance,
    isEmergencyHospital: hospitalDto.isEmergencyHospital,
    phoneNumber: hospitalDto.phoneNumber,
    reviews: converterReviewDtoToModel(hospitalDto.reviews),
    location: {
      latitude: hospitalDto.location.coordinates[1],
      longitude: hospitalDto.location.coordinates[0],
    },
  };
}

/**
 * Converte LatLngLiteral para HospitalLatLng
 * @param latLng  LatLngLiteral
 * @returns  HospitalLatLng
 */
function converterLatLngToHospitalLatLng(
  latLng: LatLngLiteral
): HospitalLatLng {
  return {
    latitude: latLng.lat,
    longitude: latLng.lng,
  };
}

/**
 * Converte HospitalReviewDTO para HospitalReview
 * @param reviewDto Array<HospitalReview>
 * @returns Array<HospitalReview>
 */
function converterReviewDtoToModel(
  reviewDto: Array<HospitalReview>
): Array<HospitalReview> {
  return reviewDto.map((review) => {
    return {
      author: review.author,
      authorUrl: review.authorUrl,
      photo: review.photo,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
    };
  });
}
