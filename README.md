# Searchmed-API
> Serviço para aplicativo de busca por hospitais

## Descrição
Essa serviço foi criado para catalogar os hospitais públicos em Belo Horizonte, fornecidos pela api PLACE API do Google Maps. O objetivo é através do endereço da pessoa, enviado pelo body das requisições, retornar uma lista de hospitais ordenados pela distância onde a pessoa está.

## Índice

- [Descrição](#descrição)
- [Instruções de Instalação e Configuração](#instruções-de-instalação-e-configuração)
- [Endpoints da API](#endpoints-da-api)
  - [GET - Pegar latitude e longitude a partir do endereço do usuário](#get---pegar-latitude-e-longitude-a-partir-do-endereço-do-usuário)
  - [GET - Lista de busca de hospitais pelo nome](#get---lista-de-busca-de-hospitais-pelo-nome)

## Instruções de Instalação e Configuração

1. Clone este repositório.
2. Rode `npm install` ou `yarn install` para instalar as dependências.
3. Crie um arquivo `.env` e configure quaisquer variáveis de ambiente necessárias.
4. Rode `npm start` ou `yarn start` para iniciar o servidor.

## Endpoints da API

### GET - Pegar latitude e longitude a partir do endereço do usuário

Esse endpoint serve para pegar latitude e longitude de todos os hospitais no raio de 10km do endereço do usuário. Caso queira aumentar o raio de procura, é possível, basta passar `range=<valor> Ex: range=20`

**Requisição:**

```bash
curl --location 'http://localhost:3000/place/hospitals/maps?latitude=-19.8374075&longitude=-43.9836488' \
--data ''
```

**Resposta:**
```json
// SUCESSO
[
   "status": "200",
   "result": {
     "latitude": -19.9198,
     "longitude": -43.9386
   }
]

// SUCESSO - Hospitais não encontrados
[
   "status": "200",
   "result": {
     "latitude": -19.9198,
     "longitude": -43.9386
   }
]

// ERROR - Endereço do usuário não foi passado 
[
   "status": "404",
   "result": "Latitude and Longitude must be valid numbers."
]
```

### GET - Lista de busca de hospitais pelo nome

Esse endpoint serve para pegar a lista de hospitais de acordo com o nome digitado pelo usuário. Vale
ressaltar que esses hospitais são ordenados baseados na localidade do usuário.

**Requisição:**

```bash
curl --location 'http://localhost:3000/place/hospital/search?latitude=-19.8374075&longitude=-43.9836488&hospitalName=Hosp&page=3&limite=10&=' \
--header 'Content-Type: application/json' \
--data ''
```

**Resposta:**
```json
// SUCESSO - 1 Página
{
    "state": "200",
    "result": [
        { 10 hospitais }
    ],
    "nextpage": "http://localhost:3000?page=2&limit=10",
    "prevPage": null
}

// SUCESSO - Próximas páginas
{
    "state": "200",
    "result": [
        { 10 hospitais }
    ],
    "nextpage": "http://localhost:3000?page=4&limit=10",
    "prevPage": "http://localhost:3000?page=2&limit=10"
}

// ERROR - Nome do hospital não fornecido
{
    "state": "404",
    "message": "Hospital name must be valid."
}

// ERROR - Endereço do usuário não foi passado 
{
   "status": "404",
   "result": "Latitude and Longitude must be valid numbers."
}
```

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