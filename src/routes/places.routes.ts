import { Router } from "express";
import { placeAutoCompleteController, placeSearchHospitalController } from "../controller/place.controller";

function placeAutoCompleteRoute(route: Router) {
    /**
     * Essa chamada retorna uam lista de endereços de acordo com o address passado
     * por parametro.
     * @params address: String
     * @returns Array<string>
     */
    route.post("/place/autocomplete", placeAutoCompleteController)
}

function placesRoute(route: Router) {
    route.post('/place/hospital/search', placeSearchHospitalController )
}

export {
    placeAutoCompleteRoute,
    placesRoute
}