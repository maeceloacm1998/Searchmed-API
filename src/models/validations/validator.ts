import { validate } from "@middlewares/validate";
import { latLngSchemeValidator } from "./latlng.scheme.validator";
import { searchHospitalSchemeValidator } from "./search.hospital.scheme.validator";

export const validateLatLng = validate(latLngSchemeValidator);
export const validateSearchHospital = validate(searchHospitalSchemeValidator);
