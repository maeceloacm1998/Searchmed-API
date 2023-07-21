# Searchmed-API
> Serviço para aplicativo de busca por hospitais

Essa serviço foi criado para catalogar os hospitais público em Belo Horizonte, fornecidos pela api PLACE API do Google Maps. O objetivo é através do endereço da pessoa, enviado
pelo body das requisições, retornar uma lista de hospitais ordenados pela distância onde a pessoa está.

## Endpoints
### Autocomplete de endereço 
- POST ```/place/autocomplete```
  
Retorna uma lista de endereços compatíveis no Brasil, de acordo com o endereço passado pelo body.

Request:
```
{
	"address": <Endereço aqui>
}
```

Respomse:
```
[
	{
		"id": "0",
		"address": "Rua Hildebrando de Oliveira, 235 - Vila Copacabana, Belo Horizonte - MG, Brasil"
	},
	{
		"id": "1",
		"address": "Rua Hildebrando de Oliveira, 235 - São Sebastião do Uatumã, AM, Brasil"
	}
]
```

Curl Exemple:
```
curl --request POST \
  --url https://searchmed.onrender.com/place/autocomplete \
  --header 'Content-Type: application/json' \
  --data '{
	"address": "Rua hildebrando de Oliveira, 235"
}'
```

---

### Buscar hospitais por distância
- POST ```/place/hospital/search```
  
Essa chamada serve para retornar todos os hospitais públicos em belo horizonte, mostrando a distãncia em KM do endereço mandado pelo body até o local.

Request:
```
{
	"address": <Endereço aqui>
}
```

Respomse:
```
[
		{
			"_id": "64b9cfdd9e149a083ac6d3da",
			"address": "R. das Gabirobas, 01 - Vila Cloris, Belo Horizonte - MG, 31744-012, Brasil",
			"geometry": {
				"location": {
					"lat": -19.8178624,
					"lng": -43.9487557
				},
				"viewport": {
					"northeast": {
						"lat": -19.81659497010728,
						"lng": -43.94746712010728
					},
					"southwest": {
						"lat": -19.81929462989272,
						"lng": -43.95016677989273
					}
				}
			},
			"name": "Pronto-Socorro do Hospital Risoleta",
			"opening_hours": {
				"open_now": true
			},
			"place_id": "ChIJZcL4a_uPpgARSlksk1vVyhw",
			"rating": 0,
			"distance": 4248,
			"types": [
				"hospital",
				"health",
				"point_of_interest",
				"establishment"
			],
			"isEmergencyHospital": false,
			"__v": 0
		},
]
```

Curl Exemple:
```
curl --request POST \
  --url https://searchmed.onrender.com/place/hospital/search \
  --header 'Content-Type: application/json' \
  --data '{
	"address": "Rua hildebrando de Oliveira, 235"
}'
```

---

### Buscar detalhes do hospital
- POST ```/place/hospital/details?:placeid```
  
Essa chamada serve para pegar os detalhes daquele hospital específico, através do placeId

Respomse:
```
[
	{
		"id": "0",
		"address": "Rua Hildebrando de Oliveira, 235 - Vila Copacabana, Belo Horizonte - MG, Brasil"
	},
	{
		"id": "1",
		"address": "Rua Hildebrando de Oliveira, 235 - São Sebastião do Uatumã, AM, Brasil"
	}
]
```

Curl Exemple:
```
curl --request POST \
  --url https://searchmed.onrender.com/place/hospital/search \
  --header 'Content-Type: application/json' \
  --data '{
	"address": "Rua hildebrando de Oliveira, 235"
}'
```

- Criação de contatos - POST: http://localhost:3333/createcontact
  .Usado para criar um contato novo contendo **NOME**, **EMAIL** e **TELEFONE** de cada contato.
  
- Lista de contatos - PUT: http://localhost:3333/update/:id_contatos'
  .Usado para atualizar o contato que você desejar. Para isso você vai inserir o _id que cada contato tem e inserir na URL depois do `update/`.  
  
- Lista de contatos - DELETE: http://localhost:3333/delete/:id_contato
  .Usado para deletar um contato da lista. Para isso você vai inserir o _id que cada contato tem e inserir na URL depois do `delete/`.
