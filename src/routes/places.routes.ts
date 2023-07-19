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
    /**
     * Essa chamada serve para retornar todos os hospitais públicos em belo horizonte, mostrando
     * a distãncia em KM do endereço mandado pelo body até o local.
     * @params address: String
     * @returns Array<PlaceSearchHospitalResponse>
     */
    route.post('/place/hospital/search?:pageToken', placeSearchHospitalController )
}

export {
    placeAutoCompleteRoute,
    placesRoute
}