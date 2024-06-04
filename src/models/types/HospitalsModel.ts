import { HospitalDTO } from "./dto/HospitalDTO";

export interface HospitalModel {
  place_id: string;
  address: string;
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
 * Converter HospitalDTO para HospitalModel
 * @param hospitalDto  HospitalDTO
 * @returns HospitalModel
 */
export function converterHospitaDtoToModel(
  hospitalDto: HospitalDTO
): HospitalModel {
  return {
    place_id: hospitalDto.place_id,
    address: hospitalDto.address,
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
 * Converte HospitalReviewDTO para HospitalReview
 * @param reviewDto Array<HospitalReview>
 * @returns Array<HospitalReview>
 */
function converterReviewDtoToModel(
  reviewDto: Array<HospitalReview> = []
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
