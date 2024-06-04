import { getCurrentDateInBrasilia } from "@/helpers/date";
import HospitalLastSelectedScheme from "@/models/schema/HospitalLastSelectedScheme";
import { HospitalLastSelectedDTO } from "@/models/types/dto/HospitalLastSelectedDTO";
import { PlaceStatus } from "@/models/types/PlaceStatus";
import { StatusCode } from "@/models/types/StatusCode";

/**
 * Salva o hospital selecionado pelo usuário.
 * @param userId
 * @param hospitalName
 * @returns HospitalLastSelected | NotFound | BadRequest
 */
async function onCreatedLastSelectedPlace(
  userId: string,
  hospitalName: string
): Promise<PlaceStatus<HospitalLastSelectedDTO>> {
  try {
    const lastSelected: HospitalLastSelectedDTO = {
      userId: userId,
      name: hospitalName,
      createAt: getCurrentDateInBrasilia(),
    };

    let hospital = await HospitalLastSelectedScheme.findOne({
      userId: userId,
      name: hospitalName,
    });

    if (!hospital) {
      hospital = new HospitalLastSelectedScheme(lastSelected);
      await hospital.save();
    }

    return {
      status: StatusCode.Success,
      result: hospital,
    };
  } catch (e) {
    console.log(e);
    return {
      status: StatusCode.BadRequest,
      result: {} as HospitalLastSelectedDTO,
    };
  }
}

/**
 *  Retorna a lista de hospitais selecionados pelo usuário.
 * @param userId
 * @returns Array<HospitalLastSelected> | NotFound | BadRequest
 */
async function onGetLastSelectedPlace(
  userId: string
): Promise<PlaceStatus<HospitalLastSelectedDTO[]>> {
  try {
    const hospital = await HospitalLastSelectedScheme.find({
      userId: userId,
    });

    if (!hospital) {
      return {
        status: StatusCode.notFound,
        result: [] as HospitalLastSelectedDTO[],
      };
    }

    return {
      status: StatusCode.Success,
      result: hospital,
    };
  } catch (e) {
    console.log(e);
    return {
      status: StatusCode.BadRequest,
      result: [] as HospitalLastSelectedDTO[],
    };
  }
}

export { onCreatedLastSelectedPlace, onGetLastSelectedPlace };
