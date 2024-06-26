import { Request, Response } from "express";
import { StatusCode } from "@models/types/status.code";
import { placeAutoComplete } from "@services/places.service";

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

export { placeAutoCompleteController };
