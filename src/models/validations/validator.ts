import { validate } from "@middlewares/validate";
import { latLngSchemeValidator } from "./latlng.scheme.validator";

export const validateLatLng = validate(latLngSchemeValidator);
