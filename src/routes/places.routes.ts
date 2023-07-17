import { Router } from "express";
import { placeAutoCompleteController } from "../controller/place.controller";

function placeAutoCompleteRoute(route: Router) {
    /**
     * Essa chamada retorna uam lista de endereços de acordo com o address passado
     * por parametro.
     * @params address: String
     * @returns Array<string>
     */
    route.get("/place/autocomplete", placeAutoCompleteController)
}

export {
    placeAutoCompleteRoute
}