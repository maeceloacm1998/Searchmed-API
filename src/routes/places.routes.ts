import { Router } from "express";
import { placeAutoCompleteController } from "../controller/place.controller";

function placeAutoCompleteRoute(route: Router) {
    route.get("/place/autocomplete", placeAutoCompleteController)
}

export {
    placeAutoCompleteRoute
}