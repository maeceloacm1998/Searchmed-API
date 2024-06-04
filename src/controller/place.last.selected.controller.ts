import { converterHospitalLastSelectedDTOToHospitalLastSelected } from "@/models/types/HospitalLastSelectedModel";
import { StatusCode } from "@/models/types/StatusCode";
import {
  onCreatedLastSelectedPlace,
  onGetLastSelectedPlace,
} from "@/services/places.lastselected.service";
import { Request, Response } from "express";

async function placeLastSelectedCreateController(req: Request, res: Response) {
  const userId = String(req.query.userId);
  const hospitalName = String(req.query.hospitalName);

  const response = await onCreatedLastSelectedPlace(userId, hospitalName);

  switch (response.status) {
    case StatusCode.Success: {
      res.status(parseInt(response.status)).send({
        status: response.status,
        result: converterHospitalLastSelectedDTOToHospitalLastSelected(
          response.result
        ),
      });
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(response.status)).send({
        status: response.status,
        result: "Error to create last selected hospital.",
      });
      break;
    }
  }
}

async function placeLastSelectedGetController(req: Request, res: Response) {
  const userId = String(req.query.userId);

  const response = await onGetLastSelectedPlace(userId);

  switch (response.status) {
    case StatusCode.Success: {
      res.status(parseInt(response.status)).send({
        status: response.status,
        result: response.result.map((hospital) =>
          converterHospitalLastSelectedDTOToHospitalLastSelected(hospital)
        ),
      });
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(response.status)).send({
        status: response.status,
        result: "Error to get last selected hospital.",
      });
      break;
    }
  }
}

export { placeLastSelectedCreateController, placeLastSelectedGetController };
