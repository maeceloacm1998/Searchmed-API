import { validate } from "@middlewares/validate";
import { latLngSchemeValidator } from "./latlng.scheme.validator";
import { searchHospitalSchemeValidator } from "./search.hospital.scheme.validator";
import { hospitalLastSelectedSchemeValidator } from "./hospital.last.selected.validator";

export const validateLatLng = validate(latLngSchemeValidator);
export const validateSearchHospital = validate(searchHospitalSchemeValidator);
export const validateHospitalLastSelected = validate(
  hospitalLastSelectedSchemeValidator
);
export const validateGetHospitalLastSelected = validate(
  hospitalLastSelectedSchemeValidator
);
