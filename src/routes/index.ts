import {Router} from "express"

import { placeAutoCompleteRoute, placesRoute } from "./places.routes"

export function invoke(): Router {
    const router = Router()
    placeAutoCompleteRoute(router)
    placesRoute(router)
    return router
}