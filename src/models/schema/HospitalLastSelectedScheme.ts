import mongoose, { Schema, Document } from "mongoose";
import { HospitalLastSelectedDTO } from "../types/dto/HospitalLastSelectedDTO";

export interface IHospitalLastSelectedSchema
  extends HospitalLastSelectedDTO,
    Document {}

const HospitalLastSelectedSchema: Schema = new Schema({
  userId: { type: String, required: false },
  name: { type: String, required: false },
  createAt: { type: String, required: false },
});

export default mongoose.model<IHospitalLastSelectedSchema>(
  "hospital_last_selected",
  HospitalLastSelectedSchema
);
