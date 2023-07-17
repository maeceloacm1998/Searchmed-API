import {Router} from "express"

import { placeAutoCompleteRoute } from "./places.routes"

function teste(route: Router) {
    // ** EXEMPLO PROCURANDO TODOS HOSPITAIS PUBLICOS **

    // route.get("/teste", async (req, res) => {
    //     // await testeController.CreatePet({name: "aqui"})
    //     const dale: Client = new Client()
    //     const x = {
    //         params: {
    //             query: "Hospitais públicos em belo horizonte",
    //             key: "AIzaSyC90GoRw5i2ku37yIumudCbgSFS3aT9K6c",
    //             keywork: "(emergency) AND ((medical centre) OR hospital) AND (24 hours)"
    //         }
    //     }
    //     const region = await dale.textSearch(x as TextSearchRequest)
    //     console.log(region.data.results)
    //     let json = {
    //         code: 200,
    //         message: region.data.results
    //     }
    //     res.send(json)
    // })
}

export function invoke(): Router {
    const router = Router()
    placeAutoCompleteRoute(router)
    return router
}