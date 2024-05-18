import { Request, Response } from "express";
import { StatusCode } from "../model/types/StatusCode";
import {
  placeAutoComplete,
  placeHospitalDetails,
  placeSearchHospital,
} from "../services/places.service";

async function placeAutoCompleteController(req: Request, res: Response) {
  const address: string = req.body.address;

  const autocompleteRequest = await placeAutoComplete(address);

  switch (autocompleteRequest.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send(
        autocompleteRequest.result.map((item, index) => {
          return {
            id: index.toString(),
            address: item.description,
          };
        })
      );
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send([]);
      break;
    }
  }
}

async function placeSearchHospitalController(req: Request, res: Response) {
  const address: string = req.body.address;

  const searchHospital = await placeSearchHospital(address);

  switch (searchHospital.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send(searchHospital);
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send([]);
      break;
    }
  }
}

async function placeSearchHospitalDetailsController(
  req: Request,
  res: Response
) {
  const placeId = req.query.placeid as string;

  const hospitalDestails = await placeHospitalDetails(placeId);

  switch (hospitalDestails.status) {
    case StatusCode.Success: {
      res.status(parseInt(StatusCode.Success)).send(hospitalDestails);
      break;
    }

    case StatusCode.notFound: {
      res.status(parseInt(StatusCode.notFound)).send([]);
      break;
    }
  }
}

export {
  placeAutoCompleteController,
  placeSearchHospitalController,
  placeSearchHospitalDetailsController,
};
