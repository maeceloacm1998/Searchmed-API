import mongoose, { Schema } from "mongoose";
import { SearchHospitalModel } from "../types/PlaceSearchHospitalResponse";

export interface IHospitalSchema extends SearchHospitalModel, Document {}

const HospitalSchema: Schema = new Schema({
  address: { type: String, required: false },
  geometry: { type: Schema.Types.Mixed, required: false },
  name: { type: String, required: false },
  opening_hours: { type: Schema.Types.Mixed, required: false },
  place_id: { type: String, required: false },
  rating: { type: Number, required: false },
  distance: { type: Number, required: false },
  types: { type: Schema.Types.Mixed, required: false },
  isEmergencyHospital: { type: Boolean, required: false },
})

export default mongoose.model<IHospitalSchema>('Hospitals', HospitalSchema);