import mongoose, { Schema, Document } from "mongoose";
import { HospitalDTO } from "@models/types/dto/HospitalDTO";

export interface IHospitalSchema extends HospitalDTO, Document {}

const ReviewSchema: Schema = new Schema({
  author: { type: String, required: true },
  authorUrl: { type: String, required: false },
  photo: { type: String, required: false },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
});

const HospitalSchema: Schema = new Schema({
  place_id: { type: String, required: false },
  address: { type: String, required: false },
  name: { type: String, required: false },
  rating: { type: Number, required: false },
  distance: { type: Number, required: false },
  isEmergencyHospital: { type: Boolean, required: false },
  phoneNumber: { type: String, required: false },
  reviews: { type: [ReviewSchema], required: false },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export default mongoose.model<IHospitalSchema>("Hospitals", HospitalSchema);
