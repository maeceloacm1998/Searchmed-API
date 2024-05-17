import { Router } from "express";
import {
  placeAutoCompleteController,
  placeSearchHospitalController,
  placeSearchHospitalDetailsController,
  placeSearchHospitalsMapsController,
} from "../controller/place.controller";

function placeAutoCompleteRoute(route: Router) {
  /**
   * Essa chamada retorna uam lista de endereços de acordo com o address passado
   * por parametro.
   * @params address: String
   * @returns Array<string>
   */
  route.post("/place/autocomplete", placeAutoCompleteController);
}

function placesRoute(route: Router) {
  /**
   * Controlador para a rota /place/hospitals/maps.
   * Espera os seguintes parâmetros de consulta:
   * - latitude: a latitude do usuário
   * - longitude: a longitude do usuário
   * - range: o alcance para buscar hospitais
   * @returns Array<PlaceSearchHospitalsMap>
   * @throws NotFound
   *
   * Exemplo de uso:
   * /place/hospitals/maps?latitude=-19.9198&longitude=-43.9386&range=10000
   *
   * Exemplo de resposta:
   * [
   *  {
   *   "latitude": -19.9198,
   *   "longitude": -43.9386
   *  }
   * ]
   *
   * @see https://developers.google.com/maps/documentation/places/web-service/search
   * @see https://developers.google.com/maps/documentation/places/web-service/search#TextSearchRequests
   * @see https://developers.google.com/maps/documentation/places/web-service/search#PlaceSearchRequests
   * @see https://developers.google.com/maps/documentation/places/web-service/search#PlaceSearchResults
   */
  route.get("/place/hospitals/maps", placeSearchHospitalsMapsController);

  /**
   * Essa chamada serve para retornar todos os hospitais públicos em belo horizonte, mostrando
   * a distãncia em KM do endereço mandado pelo body até o local.
   * @params address: String
   * @returns Array<PlaceSearchHospitalResponse>
   */
  route.post(
    "/place/hospital/search?:pageToken",
    placeSearchHospitalController
  );

  /**
   * Essa chamada serve para pegar os detalhes daquele hospital específico, através do placeId
   * @params placeId: String
   */
  route.post(
    "/place/hospital/details?:placeid",
    placeSearchHospitalDetailsController
  );
}

export { placeAutoCompleteRoute, placesRoute };
