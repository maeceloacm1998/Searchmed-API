import { Router } from "express";
import { placeAutoCompleteController, placeSearchHospitalController, placeSearchHospitalDetailsController } from "../controller/place.controller";

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
    route.post('/place/hospital/search', placeSearchHospitalController )

    /**
     * Essa chamada serve para pegar os detalhes daquele hospital específico, através do placeId
     * @params placeId: String
     */
    route.post('/place/hospital/details?:placeid', placeSearchHospitalDetailsController)
}

export {
    placeAutoCompleteRoute,
    placesRoute
}