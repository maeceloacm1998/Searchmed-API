import { Router } from "express";
import {
  placeAutoCompleteController,
  placeSearchHospitalController,
  placeSearchHospitalDetailsController,
  placeSearchHospitalToEmergencyController,
  placeSearchHospitalsMapsController,
} from "../controller/index";

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
   *
   * @param latitude: a latitude do usuário
   * @param longitude: a longitude do usuário
   * @param range: o alcance para buscar hospitais
   *
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
   * Essa chamada serve para retornar o hospital público de emergência mais próximo
   * do endereço mandado pelo body até o local.
   *
   * @param latitude: a latitude do usuário
   * @param longitude: a longitude do usuário
   * @param range: o alcance para buscar hospitais
   *
   * @returns HospitalsModel
   *
   * Exemplo de uso:
   * /place/hospitals/emergency?latitude=-19.9198&longitude=-43.9386&range=10000
   *
   * Exemplo de resposta:
   * {
   * "place_id": "ChIJz7JQJ5Zm0JQR3Jb1J6G5Q1A",
   * "address": "R. dos Otoni, 909 - Santa Efigênia, Belo Horizonte - MG, 30150-270, Brasil",
   * "geometry": {
   *  "latitude": -19.9198,
   * "longitude": -43.9386
   * },
   * "name": "Hospital da Baleia",
   * "rating": 4.3,
   * "distance": 0.5,
   * "isEmergencyHospital": true,
   * "phoneNumber": "(31) 3489-1600",
   * "reviews": [
   * {
   * "author": "Rafael",
   * "authorUrl": "https://www.google.com/maps/contrib/107579013682013013000/reviews",
   * "photo": "https://lh3.googleusercontent.com/a-/AOh14Gj
   * "rating": 5,
   * "comment": "Ótimo atendimento",
   * "date": "2021-08-10T00:00:00.000Z"
   * }
   * ]
   * }
   */
  route.get(
    "/place/hospitals/emergency",
    placeSearchHospitalToEmergencyController
  );

  /**
   * Essa chamada serve para retornar uma lista de hospitais de acordo com o nome passado por parametro.
   * @params hospitalName: String
   * @params latitude: Number
   * @params longitude: Number
   * @params range: Number
   * @params page: Number
   * @params limit: Number
   *
   * @returns Array<HospitalModel>
   * @throws NotFound
   *
   * Exemplo de uso:
   * /place/hospital/search?hospitalName=Santa Casa&latitude=-19.9198&longitude=-43.9386&range=10000&page=1&limit=10
   *
   * Exemplo de resposta:
   * {
   * "state": 200,
   * "result": [
   * { 10 hospitais },
   * ],
   * "nextpage": "http://localhost:3000/place/hospital/search?hospitalName=Santa Casa&latitude=-19.9198&longitude=-43.9386&range=10000&page=2&limit=10",
   * "prevPage": "http://localhost:3000/place/hospital/search?hospitalName=Santa Casa&latitude=-19.9198&longitude=-43.9386&range=10000&page=1&limit=10"
   * }
   */
  route.get("/place/hospital/search", placeSearchHospitalController);

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
