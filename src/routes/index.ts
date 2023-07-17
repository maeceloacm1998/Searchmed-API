import {Router} from "express"

import testeController from "../controller/exempleController"

function teste(route: Router) {
    route.get("/teste", async (req, res) => {
        await testeController.CreatePet({name: "aqui"})
        let json = {
            code: 200,
            message: "dale dale"
        }
        res.send(json)
    })
}

export function invoke(): Router {
    const router = Router()
    teste(router)
    return router
}