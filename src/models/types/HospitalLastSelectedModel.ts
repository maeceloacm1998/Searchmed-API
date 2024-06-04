import { HospitalLastSelectedDTO } from "./dto/HospitalLastSelectedDTO";

export interface HospitalLastSelected {
  userId: string;
  name: string;
  createAt: string;
}

export function converterHospitalLastSelectedDTOToHospitalLastSelected(
  hospitalLastSelectedDTO: HospitalLastSelectedDTO
): HospitalLastSelected {
  return {
    userId: hospitalLastSelectedDTO.userId,
    name: hospitalLastSelectedDTO.name,
    createAt: hospitalLastSelectedDTO.createAt,
  };
}
